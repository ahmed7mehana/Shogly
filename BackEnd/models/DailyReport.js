const mongoose =require("mongoose")

const DailyReportSchema= new mongoose.Schema({

golash:{
            type:String,
            trim:true
        },
spreng:{
            type:String,
            trim:true
        },
Perished:{
        type: String,
        trim: true,
      },
Malfunctions:{
        type: String,
        trim: true,
    },
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


const DailyReport= mongoose.model("DailyReport", DailyReportSchema);




//func
module.exports={
    DailyReport
}