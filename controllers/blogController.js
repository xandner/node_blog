const Blog = require("../models/blog");
const { formatDate } = require("../utils/jalali");

exports.getIndex = async (req, res) => {
    try {
        const posts = await Blog.find({ status: "public" }).sort({
            createdAt: "desc",
        });

        res.render("index", {
            pageTitle: "وبلاگ",
            path: "/",
            posts,
            formatDate,
        });
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};


exports.getSinglePost = async (req, res) => {
    try {
        const post = await Blog.findOne({ status: "public" }).populate(
            "user"
        );

        if (!post) return res.redirect("errors/404");

        res.render("post", {
            pageTitle: post.title,
            path: "/post",
            post,
            formatDate,
        });
    } catch (err) {
        console.log(err);
        res.render("errors/500");
    }
};
