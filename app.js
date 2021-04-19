const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exoressLayout=require('express-ejs-layouts');

const path = require("path");

//* load ENV
dotenv.config({ path: "./config/config.env" });

const indexRoutes = require("./routes/blog");
const connectDB = require("./config/db");
const dashRoutes=require('./routes/dashboard');

const app = express();

//* logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//*view engine
app.set("view engine", "ejs");
app.set("views", "views");
app.use(exoressLayout)
app.set('layout','./layouts/mainLayout')

//*body parser
app.use(express.urlencoded({extended:false}))

//* connect to db

connectDB();

//*static folder
app.use(express.static(path.join(__dirname, "public")));

//* routes
app.use('/dashboard',dashRoutes)
app.use('/users',require('./routes/users'))
app.use(indexRoutes);

//* 404 page
app.use((req,res)=>{
res.render("404",{pageTitle:"صفحه پیدا نشد",path:'/404'})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server_ranning_on_3000", process.env.NODE_ENV);
});
