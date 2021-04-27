const multer = require('multer');

const Blog = require('../models/blog');
const { formatDate } = require('../utils/jalali');
const { get500 } = require('./errorController');
const { fileFilter, storage } = require('../utils/multer');


exports.getDashboard = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id })
        res.render('private/blog', {
            pageTitle: "صفحه مدیریت",
            path: '/dashboard',
            layout: "./layouts/dashLayout",
            fullname: req.user.fullname,
            blogs,
            formatDate,
        })
    } catch (error) {
        get500(req, res)
        console.log(error);
    }
}

exports.getAddPost = (req, res) => {
    res.render('private/addpost', {
        pageTitle: "پست جدید",
        path: '/dashboard/add-post',
        layout: './layouts/dashLayout',
        fullname: req.user.fullname
    })
}
exports.createPost = async (req, res) => {

    try {
        await Blog.postValidation(req.body)
        // throw new Error('error')
        await Blog.create({ ...req.body, user: req.user.id })
        res.redirect('/dashboard')
    } catch (err) {
        const errorArr = []
        // get500(req,res)
        console.log(err);
        err.inner.forEach((e) => {
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });


        res.render('private/addpost', {
            pageTitle: "پست جدید",
            path: '/dashboard/add-post',
            layout: './layouts/dashLayout',
            fullname: req.user.fullname,
            errors: errorArr
        })
    }
}

exports.uploadImage = (req, res) => {
    // let fileName = `${uuid()}.jpg`;



    const upload = multer({
        limits: { fileSize: 4000000 },
        dest: "uploads/",
        storage: storage,
        fileFilter: fileFilter,
    }).single("image");

    upload(req, res, (err) => {
        if (err) {
            res.send(err);
        } else {
            if(req.file){
                res.status(200).send("آپلود عکس موفقیت آمیز بود");

            }else{

                res.send("فایلی باید انتخاب شود")
            }

        }
    });
};
