const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const path = require("path");

const mongoose = require("mongoose");
require("./src/db/conn");
const staticPath = path.join(__dirname,"../public");

app.use(express.static('public'))

// app.use('/frontend_assets/lead_mgmt/css',express.static(__dirname +'public/frontend_assets/lead_mgmt/css'))
// app.use('/frontend_assets/lead_mgmt/js',express.static(__dirname+'public/frontend_assets/lead_mgmt/js'))
// app.use('/frontend_assets/lead_mgmt/images',express.static(__dirname+'public/frontend_assets/lead_mgmt/images'))

// app.use('/backend_assets/lead_mgmt/css',express.static(__dirname+'public/backend_assets/lead_mgmt/css'))
// app.use('/backend_assets/lead_mgmt/js',express.static(__dirname+'public/backend_assets/lead_mgmt/js'))
// app.use('/backend_assets/lead_mgmt/plugins',express.static(__dirname+'public/backend_assets/lead_mgmt/plugins'))
// app.use('/backend_assets/lead_mgmt/img',express.static(__dirname+'public/backend_assets/lead_mgmt/img'))
// app.use('/backend_assets/lead_mgmt/fonts',express.static(__dirname+'public/backend_assets/lead_mgmt/fonts'))


app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const dataRouter = require("./src/routers/data");
const dataModels = require("./src/models/data");


app.use(
  dataRouter
 );


// app.get("/", async (req,res)=>{
//   try {
//       const users = await userModel.find();
//       //res.status(200).send(users);
//       res.status(200).render('frontend/lead_mgmt/index',{users:users})
//          } catch (error) {
//       res.status(400).send(error)
//   }
//   }); 


app.get('/hello', (req, res) => {
    res.send("jhjk")
})

app.get("/", async (req,res)=>{
  try {
      const data = await dataModels.find();
      console.log("data",data);
     res.status(200).render("index",{data:data});
  } catch (error) {
      res.status(400).send(error)
  }
});


app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})