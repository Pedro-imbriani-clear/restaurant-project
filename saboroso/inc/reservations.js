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
        if (fields.date.indexOf('/')> -1){
            let date = fields.date.split('/');
            fields.date = `${date[2]}-${date[1]}-${date[0]}`;
        }
            let query, params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];
            if(parseInt(fields.id)>0){
                query = `
                    UPDATE tb_reservations
                    SET 
                    name = ?,
                    email = ?,
                    people = ?,
                    time = ?
                    WHERE id = ?`;
                    params.push(fields.id);
            }else{
                query = `
                INSERT INTO tn_reservations (name,email,people,date,time)
                VALUE(?, ?, ?, ?, ?)
                `
            }
            query(query,params,(err,results)=>{
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
        });
        
    }

};