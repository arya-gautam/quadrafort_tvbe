const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const path = require("path");

const mongoose = require("mongoose");
require("./src/db/conn");
const staticPath = path.join(__dirname,"../public");
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const dataRouter = require("./src/routers/data");
const dataModels = require("./src/models/data");

var cors = require('cors')
app.use(cors())


var corsOptions = {
    origin: '*',
}

app.use(
  dataRouter
 );

//  app.use(express.json());
//  app.use(express.urlencoded({extended:false}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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