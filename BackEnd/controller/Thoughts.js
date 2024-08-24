
const expressAsyncHandler = require("express-async-handler")
const { Thoughts, validUpdateThoughts } = require("../models/Thoughts")


/**
*@description  Create
* @route  /api/create-Thought
* @method post
* @access private
*/
module.exports.CreateThoughtCtrl=expressAsyncHandler(async(req,res)=>{
//create Thought
const NThought= await Thoughts.create({
   title:req.body.title,
   category:req.body.category,
   description:req.body.description,
})


//sent res
res.status(201).json(NThought)

})


/**
 *@description  get all Thought
 * @route  /api/all-Thought
 * @method get
 * @access private
 */
 module.exports.GetAllThoughtsCtrl=expressAsyncHandler(async(req,res)=>{
 
      const Thought = await Thoughts.find().sort({createdAt:-1 })
    
    res.status(200).json(Thought)
        })

        /**
 *@description  update Thought
 * @route  /api/Thought-update
 * @method put
 * @access private
 */
module.exports.UpdateThoughtCtrl=expressAsyncHandler(async(req,res)=>{

    //[VALID]
    const{error}=validUpdateThoughts(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //GET Thought
    const Thought =await Thoughts.findById(req.params.id)
    if(!Thought){
        return res.status(400).json({message:"dont found any Thought"})
    }
    //[UPDATE Thought]
    const updateThought= await Thoughts.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            category:req.body.category,
            description:req.body.description,
        }
    },{new:true})
    
    //[GIVE DATA TO CLINET]
    res.status(200).json(updateThought)
    })


/**
 *@description  delete Thought
 * @route  /api/del-Thought
 * @method put
 * @access private
 */
 module.exports.DelThoughtCtrl=expressAsyncHandler(async(req,res)=>{
    const Thought =await Thoughts.findById(req.params.id)

        if(!Thought){ return res.status(400).json({message:"dont found any Thought"})
    }else{
        await Thoughts.findByIdAndDelete(Thought)
        res.status(200).json({message:"Thought has been deleted"})
    }


    })