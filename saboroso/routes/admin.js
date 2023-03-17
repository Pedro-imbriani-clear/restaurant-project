var express = require('express');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var  menus = require('./../inc/menus');
var reservations = require ('./../inc/reservations');
var moment = require('moment')
var router = express.Router();
moment.locale('pt-BR');

router.use(function(req,res,next){
    if(['/login'].indexOf(req.url) === - 1 && !req.session.user){
        res.redirect('/admin/login');
    }else{
        next();
    }
})
router.get('/', function(req,res,next){
    admin.dashboard().then(data=>{
        res.render("admin/index",admin.getParems(req,{
            data
        }));
      
    }).catch(err =>{
        console.error(err);
    });
 
});
router.get('/', function(req,res,next){
    req.menus = admin.getMenus();

    next();
});
router.post('/login', function(req,res,next){
    if(!req.body.email){
        users.render(req,res,"Preencha o campo email.");
    }else if(!req.body.password){
        users.render(req,res,"Preencha o camp senha");
    }else{
        users.login(req.body.email,req.body.password).then(user=>{
            req.session.user = user;
            res.redirect("/admin");
        }).catch(err=>{
            users.render(req,res,err.message  || err);
        });
    } 
});
router.get('/login', function(req,res,next){
    
users.render(req,res,null);
});
router.get('/emails', function(req,res,next){
    res.render("admin/emails",{
        menus: req.menus,
        user: req.session.user
    })
});
router.get('/contacs', function(req,res,next){
    res.render("admin/contacts",admin.getParems(req));
});
router.get('/menus', function(req,res,next){
    menus.getMenus().then(data=>{
        res.render("admin/menus",admin.getParems(req,{
            data
        }));
    });
   
});
router.post('/menus',function(req,res,next){
    menus.save(req.fields,req.files).then(results=>{
        res.send(results);
    }).catch(err=>{
        res.send(err);
    });
});
router.delete('/menus/:id',function(req,res,next){
    menus.delete(req.params.id).then(results=>{
        res.send(results);
    }).catch(err=>{
        res.send(err);
    })
});
router.get('/reservations', function(req,res,next){
    reservations.getReservations().then(date=>{
        res.render("admin/reservations",admin.getParems(req,{
            date:{},
            data,
            moment
        }));
    });
    
});
router.post('/reservations',function(req,res,next){
    reservations.save(req.fields,req.files).then(results=>{
        res.send(results);
    }).catch(err=>{
        res.send(err);
    });
});
router.delete('/reservations/:id',function(req,res,next){
    reservations.delete(req.params.id).then(results=>{
        res.send(results);
    }).catch(err=>{
        res.send(err);
    })
});
router.get('/users', function(req,res,next){
    res.render("admin/users",admin.getParems(req))
});

module.exports = router;