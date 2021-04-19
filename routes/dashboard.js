const { Router } = require("express");

const router = new Router();

router.get('/',(req,res)=>{
    res.render('dashboard',{pageTitle:"مدیریت بلاگ | داشبورد",layout:'./layouts/dashLayout'})
})




module.exports=router