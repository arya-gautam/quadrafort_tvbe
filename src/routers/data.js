const express = require("express");
const dataRouter = new express.Router();

const dataModels = require("../models/data");

/*multer ini for image uplaod */
const multer = require("multer");
/*path ini */
const path = require("path");


dataRouter.get("/", async (req,res)=>{
    try {
       // const url = req.baseUrl;
       let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log(fullUrl)
        const data = await dataModels.find();
        console.log(data);
       res.status(200).render("index",{data:data});
    } catch (error) {
        res.status(400).send(error)
    }
});

dataRouter.get("/getData", async (req,res)=>{
    try {
       let fullUrl = req.protocol + '://' + req.get('host');
        const allData = await dataModels.find();
        var fileFullUrl;
       const allData1 = allData.map(data => {
         fileFullUrl = fullUrl+ "/uploads/"+data.fileURL;
            return {
                id:data._id,
              fileType: data.filetype,
              fileURL: fileFullUrl
            };
          });
       res.status(200).send({data:allData1,status:true});
    } catch (error) {
        res.status(400).send(error)
    }
});

const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
    cb(null,path.join(__dirname,"../../public/uploads"));
    },filename:function(req,file,cb){
       const name =  Date.now()+ '-' +file.originalname
        cb(null,name);
    }
}) 
const upload = multer({storage:storage});

dataRouter.post("/addData",upload.single('image'), async (req,res)=>{
    try {
        const addData = new dataModels({
            filetype : req.body.filetype,
            fileURL : req.file.filename,
            })
            const data = await addData.save();
            const addedData = await dataModels.find();
            res.status(200).render("index",{data:addedData});
    } catch (error) {
        res.status(400).send(error)
    }
});


dataRouter.get("/editData/:id", async (req,res)=>{
    try {
      const _id = req.params.id;
        const data = await dataModels.findById(_id);
        console.log(data);
        res.status(200).render("editData",{data:data});

    } catch (error) {
        res.status(400).send(error)
    }
  });
  
  dataRouter.post("/updateData",upload.single('image'), async (req,res)=>{
    try {
      const _id = req.body.id;
        if(req.file){
            const editData = ({
                fileURL:req.file.filename
            })
            const updated = await dataModels.findByIdAndUpdate(_id,editData);
        }
        const addedData = await dataModels.find();
        res.status(200).render("index",{data:addedData});
    } catch (error) {
        res.status(400).send(error)
    }
  });


dataRouter.post("/deleteData",async(req,res)=>{
    const _id = req.body.id;
    try {
            const data = await dataModels.findByIdAndDelete(_id);
            const addedData = await dataModels.find();
            res.status(200).render("index",{data:addedData});
    } catch (error) {
        res.status(400).send(error)
    }  
});


module.exports = dataRouter;