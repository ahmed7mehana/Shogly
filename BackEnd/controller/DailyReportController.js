
const expressAsyncHandler = require("express-async-handler")
const { DailyReport, validUpdateDailyReport } = require("../models/DailyReport")
const PDFDocument = require('pdfkit'); // ستحتاج لتثبيت هذه المكتبة

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
/**
*@description  Create
* @route  /api/create-DailyReport
* @method post
* @access private
*/
module.exports.CreateDailyReportCtrl=expressAsyncHandler(async(req,res)=>{
   
//create DailyReport
const NDailyReport= await DailyReport.create({
    golash:req.body.golash,
    spreng:req.body.spreng,
   Perished:req.body.Perished,
   Malfunctions:req.body.Malfunctions,
})


//sent res
res.status(201).json(NDailyReport)

})


/**
 *@description  get all DailyReport
 * @route  /api/all-DailyReport
 * @method get
 * @access private
 */
 module.exports.GetAllDailyReportCtrl=expressAsyncHandler(async(req,res)=>{
 
const DailyReports = await DailyReport.find().sort({createdAt:-1 })
    
    res.status(200).json(DailyReports)
        })

module.exports.SBackup = expressAsyncHandler(async () => {
  // استرجاع جميع البيانات
  const data = await DailyReport.find().sort({ createdAt: -1 });

  if (data.length > 0) {
    // إنشاء ملف PDF
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'backup.pdf');
    doc.pipe(fs.createWriteStream(filePath));

    // كتابة البيانات إلى ملف PDF
    data.forEach((item, index) => {
      doc.text(`${index + 1}: ${JSON.stringify(item, null, 2)}`, { paragraphGap: 10 });
    });

    doc.end();

    // إعداد البريد الإلكتروني مع الملف المرفق
    const mailOptions = {
      from: process.env.Email,
      to: process.env.SentTO,
      subject: 'Backup of Data before Deletion',
      text: 'Attached is the backup of your data before deletion.',
      attachments: [
        {
          filename: 'backup.pdf',
          path: filePath,
        },
      ],
    };

    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);
  }
});
            
            



        /**
 *@description  update DailyReport
 * @route  /api/DailyReport-update
 * @method put
 * @access private
 */
module.exports.UpdateDailyReportCtrl=expressAsyncHandler(async(req,res)=>{
    //GET DailyReport
    const DR =await DailyReport.findById(req.params.id)
    if(!DR){
        return res.status(400).json({message:"dont found any DailyReport"})
    }
    //[UPDATE DailyReport]
    const updateDR= await DailyReport.findByIdAndUpdate(req.params.id,{
        $set:{
            golash:req.body.golash,
    spreng:req.body.spreng,
            Perished:req.body.Perished,
            Malfunctions:req.body.Malfunctions,
        }
    },{new:true})
    
    //[GIVE DATA TO CLINET]
    res.status(200).json(updateDR)
    })


/**
 *@description  delete DailyReport
 * @route  /api/del-DailyReport
 * @method put
 * @access private
 */
 module.exports.DelDailyReportCtrl=expressAsyncHandler(async(req,res)=>{
    const DR =await DailyReport.findById(req.params.id)
        if(!DR){ return res.status(400).json({message:"dont found any DailyReport"})
    }else{
        await DailyReport.findByIdAndDelete(DR)
        res.status(200).json({message:"DailyReport has been deleted"})
    }


    })




// إعداد nodemailer لإرسال البريد الإلكتروني
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.Email,
        pass: process.env.Email_Pass,
    },
  });


 module.exports.SBackup = expressAsyncHandler(async () => {
  // استرجاع جميع البيانات
  const data = await DailyReport.find().sort({ createdAt: -1 });

  if (data.length > 0) {
    // تحويل البيانات إلى JSON
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = path.join(__dirname, 'backup.json');

    // كتابة البيانات إلى ملف JSON
    fs.writeFileSync(filePath, jsonData);

    // إعداد البريد الإلكتروني مع الملف المرفق
    const mailOptions = {
      from: process.env.Email,
      to: process.env.SentTO,
      subject: 'Backup of Data before Deletion',
      text: 'Attached is the backup of your data before deletion.',
      attachments: [
        {
          filename: 'backup.json',
          path: filePath,
        },
      ],
    };

    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);
  }
});   


  module.exports.DellAllDataCRTL = expressAsyncHandler(async () => {
    try {
            // حذف جميع البيانات
            await DailyReport.deleteMany({});
  
            console.log('All data has been backed up and deleted successfully.');

    } catch (error) {
        console.error('Failed to delete data:', error);
    }
  });