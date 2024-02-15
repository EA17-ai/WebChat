import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(`${process.env.MONGO_URL}`)

const chatSchema=mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      
      
      rooms:[
        {
          roomname:{type:String},   
            roomId: {
              type: String,
              
            },
            role: {
              type: String,
              
            }
      }
      ]
        
      


})

export const chatmodel=mongoose.model("chat",chatSchema)