import mongoose from "mongoose";


mongoose.connect("mongodb+srv://ea17learning:ea17learning@cluster0.e1ozlbj.mongodb.net/?retryWrites=true&w=majority")

const chatSchema=mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      rooms:[
        {
            
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