var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  conn.query(`
  SELECT * FROM tb_menus ORDER BY title 
  `,(err,results)=>{
    if(err){
      console.log(err);
    }
    res.render('index',{
      title:'Restaurantes Saboroso!',
      menus:results
    });
  });
  res.render('index', { title: 'Restaurante Saboroso!' });
});
router,get('/contacts',function(req,res,next){
  res.render('contacts',{
    title:'contatos - Restaurantes Saboroso!',
  });
});
router,get('/menus',function(req,res,next){
  res.render('menus',{
    title:'menus - Restaurantes Saboroso!',
  });
});
router,get('/reservations',function(req,res,next){
  res.render('reservations',{
    title:'reservas - Restaurantes Saboroso!',
  });
});
router,get('/services',function(req,res,next){
  res.render('services',{
    title:'serviços  - Restaurantes Saboroso!',
  });
});
module.exports = router;
