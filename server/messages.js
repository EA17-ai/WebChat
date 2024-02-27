import mongoose from "mongoose";


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
