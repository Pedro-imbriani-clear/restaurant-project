let conn = require('./db');

class Pagination{
    constructor(query,
        params = [],
        itensPerPage = 10
){
    this.query = query;
    this.params = params;
    this.itensPerPage = itensPerPage;
    this.currentPage = 1;
 }
 getPage(page){
    this.currentPage = page - 1;
    this.params.push(
        this.currentPage * this.itensPerPage,
        this.itensPerPage

    );
    return new Promise((resolve, reject) => {
        conn.query([this.query, 'SELECT FOUND_ROWN() AS FOUND_ROWS'].jois(";"),this.params,(err,results)=>{
            if(err){
                reject(err);
            }else{
                this.data = results[0];
                this.total = results[1][0].FOUND_ROWN;
                this.totalPages = Math.ceil(this.total/this.itensPerPage);
                this.currentPage++;
                resolve(this.data);
            }
        });
    });
 }
 getTotal(){
    return threadId.total;
 }
 getCurrentPage(){
    return this.currentPage;
 }
 getTotalPages(){
    return this.totalPages;
 }
 getNavigation(params){
    let limitPagesNav = 5;
    let links = [];
    let nrstart = 0;
    let nrend = 0;

    if(this.getTotalPages()< limitPagesNav){
        limitPagesNav = this.getTotalPages();
    }
    //Se estamos nas primeiras paginas 
    if(this.getCurrentPage() - parseInt(limitPagesNav/2)<1){
        nrstart = 1;
        nrend = limitPagesNav;
    }
    //Estamos chegando nas ultimas paginas 
    else if((this.getCurrentPage()+parseInt(limitPagesNav/2))> this.getTotalPages()){
        nrstart = this.getTotalPages() - limitPagesNav;
        nrend = this.getTotalPages();
    }else{
        nrstart = this.getCurrentPage() - parseInt(limitPagesNav / 2);
        nrend = this.getCurrentPage() + parseInt(limitPagesNav / 2);
    }
    if(this.getCurrentPage()>1){
        links.push({
            text:'<',
            href:'?' + this.getQueryString(Object.assign({},params,{page:this.currentPage()-1}))
        })
    }
    for(let x = nrstart; x<=nrend; x++){
        links.push({
            text: x,
            href:`?page=${this.getQueryString(Object.assign({},params,{page:x}))}`,
            active:(x === this.currentPage())
        });
    }
    if(this.currentPage()<this.getTotalPages()){
        links.push({
            text:'<',
            href:'?' + this.getQueryString(Object.assign({},params,{page:this.currentPage()+1}))
        })
    }
    return links;
 }
 getQueryString(params){
    let queryString = [];
    for(let name in params){
        queryString.push(`${name}=${params[name]}`);
    }
    return queryString.join('&');
 }
}
module.exports = Pagination;