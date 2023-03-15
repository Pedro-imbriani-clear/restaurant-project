var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var router = express.Router();
var reservations = require('./../inc/reservations');

/* GET home page. */
router.get('/', function(req, res, next) {
menus.getMenus().then(results=>{
  res.render('index',{
    title:'Restaurantes Saboroso!',
    menus:results,
    isHome:true
  });
  });
})
  
router.get('/contacts',function(req,res,next){
  res.render('contacts',{
    title:'contatos - Restaurantes Saboroso!',
    background:'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });
});
router.get('/menus',function(req,res,next){
  menus.getMenus().then(results=>{
    res.render('menus',{
      title:'menus - Restaurantes Saboroso!',
      background:'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!'
    });
  });
 
});
router.get('/reservations',function(req,res,next){
  reservations.render(req,res);

});
router.post('/reservations',function(req,res,next){
  if(!req.body.name){
    reservations.render(req,res,'Digite seu nome');
  }else if(!req.body.email){
    reservations.render(req,res,'digite um e-mail');

  }else if(!req.body.people){
    reservations.render(req,res,'selecione o numero de pessoal ');
    
  }else if(!req.body.time){
    reservations.render(req,res,'selecione a hora');
    
  }else if(!req.body.date){
    reservations.render(req,res,'selecione a date');
  
  }else{
    reservations.save(req.body).then(results=>{
      req.body = {};
      reservations.render(req,res,null,'reserva realizada com sucesso');

    }).catch(err=>{
      reservations.render(req,res,err.message);
    });
  }
});
router.get('/services',function(req,res,next){
  res.render('services',{
    title:'serviços  - Restaurantes Saboroso!',
    background:'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!!'
  });
});
module.exports = router;
