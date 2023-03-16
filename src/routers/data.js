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
    console.log("addData",req.body);
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


// amenitiesRouter.post("/admin/amenities",upload.single('image'),async(req,res)=>{
//     try {
//        const amenities = new Amenities({
//            page_name:req.body.page_name,
//            heading:req.body.heading,
//            page_section:req.body.page_section,
//            image:req.file.filename,
//            created_at:Date(new Date()),
//            updated_at:Date(new Date())
//        })
//        const inserted = await amenities.save();
//        Amenities.find({}).populate('page_name').exec((err,result)=>{
//            if(err) throw(err)
//            res.status(201).render("amenities",{result:result,message:"Data Added Successfully",status:"success",title:"Congratulations..."})
//        })
//     } catch (error) {
//         const categories = await Categories.find();
//         res.status(404).render("addAmenity",{set:req.body,categories:categories,error});
//     }
//     });




// leadRouter.delete("/lead/:id",(req,res)=>{
//     const _id = req.params.id;
//     leadModels.findByIdAndDelete(_id)
//     .then(result => {
//         // req.flash('message','Data Deleted Success');
//         // req.flash('icon','success');
//         // req.flash('status','Amenities');
//         res.json({redirect:'/leads'});
//     })
//     .catch(error => {console.log(error)});
// });


module.exports = dataRouter;