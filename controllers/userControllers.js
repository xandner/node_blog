const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    res.render("login", { pageTitle: "ورود به بخش مدیریت", path: "/login" });
}
exports.register = (req, res) => {
    res.render("registere", {
        pageTitle: "ثبت نام کاربر جدید",
        path: "/registere",
    });
}

exports.createUser = async (req, res) => {
    const errors = []
    try {
        await User.userValidation(req.body)
        const { fullname, password, email } = req.body
        const user = await User.findOne({ email })

        if (user) {
            errors.push('این ایمیل تکراری است')
            return res.render('registere', { pageTitle: "ثبت نام", path: "/registere", errors })
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err
                await User.create({ fullname, email, password: hash })
                res.redirect("/users/login")
            })
        })
    } catch (error) {
        console.log(error)
        error.errors.forEach(e => {
            errors.push(e)
            // message=e.message
        })
        return res.render('registere', { pageTitle: "ثبت نام", path: "/registere", errors })
    }
}