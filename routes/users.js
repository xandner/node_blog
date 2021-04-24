const { Router } = require("express");
const router = new Router();
const userController = require('../controllers/userControllers');
// const v = new Validator();



//  @desc   Login Page
//  @route  GET /users/login
router.get("/login",userController.login);

//  @desc   Register Page
//  @route  GET /users/register
router.get("/register", userController.register);

//  @desc   Register Handle
//  @route  POST /users/register
router.post("/register", userController.createUser);

module.exports = router;
