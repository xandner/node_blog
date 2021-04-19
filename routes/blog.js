const { Router } = require("express");

const router = new Router();
//* index route
router.get("/", (req, res) => {
  res.render("index", { pageTitle: "بلاگ من" ,path:'/'});
});

module.exports = router;
