const express = require("express");


const path = require('path');

const indexRoutes=require('./routes/index');
const app = express();

//*view engine
app.set('view engine','ejs')
app.set('views','views')

//*static folder
app.use(express.static(path.join(__dirname,'public')))

//* routes
app.use(indexRoutes)

app.listen(3000, () => {
  console.log("server_ranning_on_3000");
});
