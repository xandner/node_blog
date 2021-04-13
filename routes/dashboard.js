const { Router } = require("express");

const router = new Router();

router.get('/',(req,res)=>{
    res.render('dashboard',{pageTitle:"مدیریت بلاگ | داشبورد",layout:'./layouts/dashLayout'})
})

router.get('/login',(req,res)=>{
    res.render('login',{pageTitle:"ورود",path:"/login"})
})


module.exports=router