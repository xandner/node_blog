const { Router } = require("express");
const { authenticated } = require('../middlewares/auth');
const adminConroller=require('../controllers/adminController');

const router = new Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.get("/", authenticated,adminConroller.getDashboard);


router.get("/add-post", authenticated,adminConroller.getAddPost);
router.get("/edit-post/:id", authenticated,adminConroller.getEditPost);

// create post
router.post("/add-post", authenticated,adminConroller.createPost);
router.post("/edit-post/:id", authenticated,adminConroller.editPost);

router.post("/image-upload",authenticated,adminConroller.uploadImage)

module.exports = router;
