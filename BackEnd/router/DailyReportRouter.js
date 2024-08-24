const { CreateDailyReportCtrl, GetAllDailyReportCtrl, DelDailyReportCtrl, UpdateDailyReportCtrl } = require("../controller/DailyReportController")

const router =require("express").Router()

//  /api/DailyReport
router.route("/").post(CreateDailyReportCtrl).get(GetAllDailyReportCtrl)
        
//  /api/DailyReport/64b25a89b569a791c5e6485d
router.route("/:id").delete(DelDailyReportCtrl)

// /api/DailyReport/updateDailyReport/64b25a89b569a791c5e6485d
router.route("/updateDailyReport/:id").put(UpdateDailyReportCtrl)


module.exports=router