const { CreateThoughtCtrl, GetAllThoughtsCtrl, DelThoughtCtrl, UpdateThoughtCtrl } = require("../controller/Thoughts")

const router =require("express").Router()


//  /api/Thought
router.route("/").post(CreateThoughtCtrl).get(GetAllThoughtsCtrl)
        
//  /api/Thought/64b25a89b569a791c5e6485d
router.route("/:id").delete(DelThoughtCtrl)

// /api/Thought/updateThought/64b25a89b569a791c5e6485d
router.route("/updateThought/:id").put(UpdateThoughtCtrl)



module.exports=router