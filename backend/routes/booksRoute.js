import  express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post('/',async(req,res)=>
    {
      try{
        if(
          !req.body.name ||
          !req.body.author ||
          !req.body.publishYear
        )
        {
          return res.status(400).send({
            message:'Send all required fields: name,author,publishYear'
          });
        }
        const newBook = {
          name:req.body.name,
          author:req.body.author,
          publishYear:req.body.publishYear,
        }; 
        const book =await Book.create(newBook);
        res.send (book);     
      }
      catch(error)
      {
        console.log(error.message);
        res.status(500).send({message:error.message});
      }
    });
    
    // Route to get all books from the database
    router.get('/',async(req,res)=>{
      try{
        const books = await Book.find();
         res.send(books);
        
      }
      catch(error)
      {
        res.send(error.message);
      }
      
    });
    
    // Route to get book by ID from the database
    router.get('/:id',async(req,res)=>{
      try{
        const book = await Book.findById(req.params.id);
         res.send(book);
        
      }
      catch(error)
      {
        res.send(error.message);
      }
      
    });
    
    // Route to update a book in the database 
    router.put('/:id',async(req,res)=>{
      try{
           if(
            !req.body.name ||
            !req.body.author ||
            !req.body.publishYear
           )
           {
            return res.status(400).send(
              {
                message : 'Send all required fields'
              });
           }
            const {id} = req.params;
            
           const result = await Book.findByIdAndUpdate(id,req.body,
            { new: true, runValidators: true });
           if(!result){
            return res.status(404).json({message:'Book not found'});
           }
           return res.status(200).send({message:'Book updated successfully'})
      }catch(error)
      {
        console.log(error.message);
      }
    });
    
    // Route to delete a book in the database 
    router.delete('/:id',async(req,res)=>{
      try{
           
            const {id} = req.params;
            
           const result = await Book.findByIdAndDelete(id,
            { new: true, runValidators: true });
           if(!result){
            return res.status(404).json({message:'Book not found'});
           }
           return res.status(200).send({message:'Book deleted successfully'})
      }catch(error)
      {
        console.log(error.message);
      }
    });

export default router;
