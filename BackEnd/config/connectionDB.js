const mongoose =require("mongoose")


module.exports=async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("You have successfully connected to my heart....")
 } catch (error) {
    console.log("we have something wrong to connection with mongo",error)
 }
}