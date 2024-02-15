import mongoose from "mongoose";

mongoose.connect("mongodb+srv://ea17learning:ea17learning@cluster0.qk8ygo5.mongodb.net/?retryWrites=true&w=majority")


const roomSchema=mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
      },
      messages:[
        {
            
            email: {
              type: String,
              
            },
            message: {
              type: String,
              
            }
      }
      ]
        
      


})
export const roomModel=mongoose.model("room",roomSchema)
