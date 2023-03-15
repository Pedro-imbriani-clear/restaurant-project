var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus')
var router = express.Router();

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
  
router,get('/contacts',function(req,res,next){
  res.render('contacts',{
    title:'contatos - Restaurantes Saboroso!',
    background:'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });
});
router,get('/menus',function(req,res,next){
  menus.getMenus().then(results=>{
    res.render('menus',{
      title:'menus - Restaurantes Saboroso!',
      background:'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!'
    });
  });
 
});
router,get('/reservations',function(req,res,next){
  res.render('reservations',{
    title:'reservas - Restaurantes Saboroso!',
    background:'images/img_bg_2.jpg',
    h1: 'Reserve uma Mesa!'
  });
});
router,get('/services',function(req,res,next){
  res.render('services',{
    title:'serviços  - Restaurantes Saboroso!',
    background:'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!!'
  });
});
module.exports = router;
