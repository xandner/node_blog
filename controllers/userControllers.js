const User=require('../models/user');

exports.login=(req,res)=>{
    res.render("login", { pageTitle: "ورود به بخش مدیریت", path: "/login" });
}
exports.register=(req,res)=>{
    res.render("registere", {
        pageTitle: "ثبت نام کاربر جدید",
        path: "/registere",
    });
}

exports.createUser=async(req,res)=>{
    try {
        await User.userValidation(req.body)
        await User.create(req.body)
        res.redirect("/users/login")
    } catch (error) {
        console.log(error)
        const errors=[]
        error.errors.forEach(e=>{
            errors.push(e)
            // message=e.message
        })
        return res.render('registere',{pageTitle:"ثبت نام",path:"/registere",errors})
    }
}