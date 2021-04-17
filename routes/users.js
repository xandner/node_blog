const { Router } = require("express");
const yup = require("yup");

const router = new Router();
const schema = yup.object().shape({
  fullname: yup.string().required("نام و نام خانوادگی الزامی است").min(4).max(100),
  email: yup.string().email().required("ادرس ایمیل الزامی است"),
  password: yup.string().required("کلمه عبور الزامی است").min(4).max(255),
  confirmPassword: yup
    .string()
    .required("تکرار کلمه عبور الزامی است")
    .oneOf([yup.ref("password"), null]),
});

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: "ورود", path: "/login" });
});
router.get("/registere", (req, res) => {
  res.render("registere", { pageTitle: "ثبت نام", path: "/registere" });
});
router.post("/registere", (req, res) => {
  schema.validate(req.body).then(result=>{
    console.log(result);
    res.send("ok")
  }).catch(err=>{
    console.log(err);
    res.send('error',{errors:err.errors})
  })
});

module.exports = router;
