import mongoose from "mongoose";

// Define the Schema
const bookSchema = new mongoose.Schema(
    {
      name:{
        type: String,
        required: true,
      },
      author:{
        type:String,
        required : true,
      },
      publishYear:{
        type: Number,
        required:true,
      }
    },
    {
        timestamps: true,
    }
);

//Create the model
export const Book = mongoose.model('Book',bookSchema);

