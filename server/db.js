import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(`mongodb+srv://ea17learning:${process.env.password}@cluster0.qk8ygo5.mongodb.net/?retryWrites=true&w=majority`)

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