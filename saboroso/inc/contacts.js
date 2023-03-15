var conn = require('./db');
module.exports ={
    render(req,res,error,success){
        res.render('contacts',{
            title:'contatos - Restaurantes Saboroso!',
            background:'images/img_bg_3.jpg',
            h1: 'Diga um oi!',
            body:req.body,
            error,
            success
          });
    },
    save(fields){
        return new Promise((resolve, reject) => {
            conn.query(` 
            INSERT INTO tn_reservations (name,email,message)
            VALUE(?, ?, ?)
            `,[
                fields.name,
                fields.email,
                fields.message
            ],(err,results=>{
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            }));
        })
    }
}