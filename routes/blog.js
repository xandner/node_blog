const controller=require('../controllers/blogController');

const { Router } = require("express");

const router = new Router();

//  @desc   Weblog Index Page
//  @route  GET /
router.get("/",controller.getIndex)

router.get("/post/:id", controller.getSinglePost);

module.exports = router;
