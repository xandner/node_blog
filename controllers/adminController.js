exports.getDashboard = async (req, res) => {
    res.render('private/blog', {
        pageTitle: "صفحه مدیریت",
        path: '/dashboard',
        layout: "./layouts/dashLayout",
        fullname: req.user.fullname
    })
}

exports.getAddPost=(req,res)=>{
    res.render('private/addpost',{
        pageTitle:"پست جدید",
        path:'/dashboard/add-post',
        layout:'./layouts/dashLayout',
        fullname:req.user.fullname
    })
}