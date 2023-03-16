const mongoose = require("mongoose");
const mongoURI  = `mongodb+srv://sutraa_techno:sutraa_techno@cluster0.5xilpsf.mongodb.net/?retryWrites=true&w=majority`;
//const mongoURI = `mongodb://127.0.0.1:27017/cms`;
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI ,{
    useNewUrlParser:true,
   // useCreateIndex:true,
    useUnifiedTopology:true,
    //useFindAndModify:false
}).then(()=>{
    console.log(`Connection Successful With Mongo DB`);
}).catch((error)=>{
    console.log(error);
});




  