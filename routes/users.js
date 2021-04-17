const { Router } = require("express");
const yup = require("yup");

const router = new Router();
const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(4, "نباید از 4 کاراکتر کم تر باشد")
    .max(100, "نباید از 100 کاراکتر بیشتر باشد"),
  email: yup
    .string()
    .email("نوع ورودی ایمیل نا معتبر است")
    .required("ادرس ایمیل الزامی است"),
  password: yup
    .string()
    .required("کلمه عبور الزامی است")
    .min(4, "کلمه عبور باید بیشتر از 4 کاراکتر باشد")
    .max(255,"کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
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
  schema
    .validate(req.body)
    .then((result) => {
      console.log(result);
      res.redirect('/users/login')
    })
    .catch((err) => {
      console.log(err.errors);
      res.render("registere", {pageTitle:"ثبت نام", path:"/registere", errors: err.errors });
    });
});

module.exports = router;
