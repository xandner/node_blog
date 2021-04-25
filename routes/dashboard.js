const { Router } = require("express");
const { authenticated } = require('../middlewares/auth');
const adminConroller=require('../controllers/adminController');

const router = new Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.get("/", authenticated,adminConroller.getDashboard);


router.get("/add-post", authenticated,adminConroller.getAddPost);

module.exports = router;
