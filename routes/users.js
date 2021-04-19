const { Router } = require("express");
const Validator = require("fastest-validator");

const router = new Router();
const v = new Validator();

const schema = {
    fullname: {
        type: "string",
        trim: true,
        min: 4,
        max: 255,
        optional: false,
        messages: {
            required: "نام و نام خانوادگی الزامی می باشد",
            stringMin: "نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد",
            stringMax: "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد",
        },
    },
    email: {
        type: "email",
        normalize: true,
        messages: {
            emailEmpty: "فیلد ایمیل نباید خالی باشد",
            required: "ایمیل الزامی می باشد",
            string: "آدرس ایمیل را بررسی کنید",
        },
    },
    password: {
        type: "string",
        min: 4,
        max: 255,
        messages: {
            required: "کلمه عبور الزامی می باشد",
            string: "کلمه عبور را بررسی کنید",
            stringMin: "کلمه عبور نباید کمتر از 4 کاراکتر باشد",
            stringMax: "کلمه عبور نمی تواند بیشتر از 255 کاراکتر باشد",
        },
    },
    confirmPassword: {
        type: "string",
        min: 4,
        max: 255,
        messages: {
            required: "تکرار کلمه عبور الزامی می باشد",
            string: "تکرار کلمه عبور را بررسی کنید",
            stringMin: "تکرار کلمه عبور نباید کمتر از 4 کاراکتر باشد",
            stringMax: "تکرار کلمه عبور نباید بیشتر از 255 کاراکتر باشد",
        },
    },
    $$strict: true,
};

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
router.post("/register", (req, res) => {
    const validate = v.validate(req.body, schema);
    const errorArr = [];
    if (validate === true) {
        const { fullname, email, password, confirmPassword } = req.body;
        console.log(fullname);
        console.log(req.body);
        if (password !== confirmPassword) {
            errorArr.push({ message: "کلمه های عبور یکسان نیستند" });

            return res.render("register", {
                pageTitle: "ثبت نام کاربر",
                path: "/register",
                errors: errorArr,
            });
        }
        res.redirect("/users/login");
    } else {
        console.log(validate);
        res.render("register", {
            pageTitle: "ثبت نام کاربر",
            path: "/register",
            errors: validate,
        });
    }
});

module.exports = router;
