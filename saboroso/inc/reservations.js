var conn = require('./db');
module.exports = {
    render(req,res,error,success){
        res.render('reservations',{
            title:'reservas - Restaurantes Saboroso!',
            background:'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body:req.body,
            error,
            success
          });
    },
    save(fields){
        return new Promise((resolve, reject) => {
            let date = fields.date.split('/');
            fields.date = `${date[2]}-${date[1]}-${date[0]}`;
            conn.query(`
        INSERT INTO tn_reservations (name,email,people,date,time)
        VALUE(?, ?, ?, ?, ?)
        `,[
            fields.name,
            fields.email,
            fields.people,
            fields.date,
            fields.time
        ],(err,results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
        });
        
    }

};