const { Router } = require("express");
const User=require('../models/user');
const router = new Router();
// const v = new Validator();



//  @desc   Login Page
//  @route  GET /users/login
router.get("/login", (req, res) => {
    res.render("login", { pageTitle: "ورود به بخش مدیریت", path: "/login" });
});

//  @desc   Register Page
//  @route  GET /users/register
router.get("/register", (req, res) => {
    res.render("registere", {
        pageTitle: "ثبت نام کاربر جدید",
        path: "/registere",
    });
});

//  @desc   Register Handle
//  @route  POST /users/register
router.post("/register", async (req, res) => {
    try {
        await User.userValidation(req.body)
        res.redirect("/users/login")
    } catch (error) {
        console.log(error)
        const errors=[]
        error.inner.forEach(e=>{
            errors.push(e.path)
            message=e.message
        })
        return res.render('registere',{pageTitle:"ثبت نام",path:"/registere",errors})
    }
});

module.exports = router;
