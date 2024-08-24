const mongoose =require("mongoose")
const express =require("express")
const cors = require("cors");
const bodyParser=require('body-parser');
const connectionDB = require("./config/connectionDB");
const cron = require('node-cron');
const { DellAllDataCRTL, SBackup } = require("./controller/DailyReportController");

require("dotenv").config();

//connection
connectionDB();

// init
const app =express();

//middleware
// app.use(express.json())
app.use(bodyParser.json())


// Cors Policy
app.use(cors());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE ");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  })
  
  
//Route
app.use("/api/Thought",require("./router/Thought"))
app.use("/api/DailyReport",require("./router/DailyReportRouter"))





//delete all data every year
cron.schedule('0 0 1 1 *', async () => {
  await DellAllDataCRTL();
  console.log(' متخيل عدي سنه يابرووو  ');
});

//send all data every month
cron.schedule('0 0 1 * *', async () => {
  await SBackup();
  console.log('متخيل عدي شهر يابرووو');
});



//server
const port=process.env.PORT || 8000

app.listen(port,()=>{
console.log("All my servers have connected when they see you...")
})
