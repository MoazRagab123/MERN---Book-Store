import express from "express";
import{PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();


// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
//Option 1:Allow all origins with Default of cors(*)
app.use(cors());
//Option 2:Allow Custom Origins
app.use(
  cors({
    origin:'http://localhost:3000',
    methods: ['GET','POST','DELETE','PUT'],
    allowedHeaders:['Content-Type','Authorization'],
  })
)

app.get('/',(req,res)=>{
  res.send('Hello from homepage');  
 });

app.use('/books',booksRoute);



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


