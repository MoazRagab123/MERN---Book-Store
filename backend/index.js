import express from "express";
import{PORT,mongoDBURL} from "./config.js"
import mongoose from "mongoose";
const app = express();

app.get('/',(req,res)=>{
 res.send('Hello from homepage');  
});

mongoose.connect(mongoDBURL)
.then(()=>{
  console.log('app connected to the DB');
  app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT} `)
});
})
.catch((error)=>{
 console.log(error);
});


