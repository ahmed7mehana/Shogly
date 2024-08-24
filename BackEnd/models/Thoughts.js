const joi=require("joi")
const mongoose =require("mongoose")

const ThoughtsSchema= new mongoose.Schema({
title:{
        type:String,
        trim:true,
        minlength:5,
    },
category: {
        type: String,
        
      },
description:{
        type: String,
        trim: true,
        minlength: 5,
     
    },
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})




const Thoughts = mongoose.model("Thoughts", ThoughtsSchema);




function validUpdateThoughts(obj){
    const schema=joi.object({
        title:joi.string().trim().min(2),
        category:joi.string().trim().min(2),
        description:joi.string().trim().min(2),
        
     })
     return schema.validate(obj)
} 
//func
module.exports={
    Thoughts,
    validUpdateThoughts
}