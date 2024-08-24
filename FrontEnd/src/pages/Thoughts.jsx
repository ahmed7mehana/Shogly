import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTHought, deleteThought, getAllThouhts } from '../rtx/api/ThoughtAPI';
import UpdateForm from '../components/update/UpdateForm';

function Thoughts() {

  const dispatch = useDispatch();
  //show Form or data
  const [Show , setShow]=useState(true)
  const [pass , setPass]=useState()

  //show update form
  const [Update , setUpdate]=useState(false)

const [title , setTitle]=useState(" ")
const [category , setcategory]=useState(" ")
const [description , setdescription]=useState(" ")


const [Uid,setUid]=useState(null) 



const submit=(e)=>{
    e.preventDefault()
    if(description.trim() && title.trim() && category.trim() ===""){
    console.log("no data here")
    }else{  
      const data={title,description,category}
    dispatch(createTHought(data));
    window.location.reload()
    
    }

  }

const DelHandler=(id)=>{
  // setDel(!del)
  dispatch(deleteThought(id))
    window.location.reload()
 }


const {Thoughts} = useSelector((state) => state.thought)

  // get all data when page open
  useEffect (() => {
    dispatch(getAllThouhts());
  }, []);


const handleUpdate=(id,item)=>{
    setUpdate(!Update)
    setUid(id)
}

  return (   
    <div className=' min-h-screen bg-[#04152d] m-5 items-center   '  > 
    {pass === "111"?"": 
    <div className='flex items-center justify-center h-screen '>
      <input placeholder='password' className=' rounded-lg p-4 pr-10 pl-10 text-center'  value={pass} onChange={(e)=>setPass(e.target.value)}/>
    </div>
  }
    {pass === "111"?
    <>
       {Show?
    <div className=' flex flex-col justify-center items-center'>
          <button onClick={()=>setShow(false)} className=' w-fit p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl  bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:350%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 '>Show Form</button>

          <div  className='flex flex-row flex-wrap h-fit m-10 justify-center items-center'>
          
          {Thoughts.map((item)=>(
            <div className=' ' key={item.id}>

            <div   className=" max-w-fit min-w-[300px] flex flex-col border-2 border-[#fff] text-white m-5 p-6 flex-row   rounded-lg bg-[#19376d] bg-gradient-to-r from-[#19376d] to-[#6490e2] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500">
                    <div className='flex flex-row justify-between'>
                        <button  className='  border-2 w-fit p-2 rounded-[20%]  bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500' onClick={()=>DelHandler(item.id)}>X</button>
                        <button  className='  border-2 w-fit p-2 rounded-[20%]  bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500' onClick={()=>handleUpdate(item.id,item)}>E</button>
                    </div>
                    {Update && Uid=== item.id?
                      <UpdateForm item={item} id={item.id} Update={Update} setUpdate={setUpdate}/>
                    :
                      <div className='' key={item.id}>
                      <p className=' text-right text-[25px] '>{item.title}</p>
                      <p className=' text-left font-bold text-[#576cbc] border-b-2 uppercase'>{item.category}</p>
                      <p className=' text-center mt-5'>{item.description}</p>
                      {/* {del?
                      <div className=' border-2 p-1 bg-[#04152d] border-black rounded-lg text-center uppercase' key={item.id}>
                        <p>u want to delete this are u sure?</p>
                        <input onSubmit={deleteItem()} placeholder='the password ' className=' rounded-lg p-1 m-2' />
                      </div>:""} */}
              </div>}
                

            </div>
            </div>
          ))}
          </div>

    </div>
   :
        <div className='flex justify-center items-center flex-col'>

          <h1 className='text-white text-4xl mt-10  class="flex justify-center items-cente text-center uppercase'> 
            Let's write ideas, notes, questions... </h1>
          

          <form  className='p-10 flex flex-col  sm:w-[80%] w-full'>
              <label  className=' text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>title</label> 
              <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className=' border-2 rounded-[50px] p-2 mt-2' placeholder='write good title'/>

              <label  className=' text-center lg:text-left lg:text-3xl text-2xl uppercase text-white mt-5'>Choose a categoryygory</label>
              <select value={category} onChange={(e)=>setcategory(e.target.value)}  name="kind" id="kind" className=' border-2 rounded-[50px] p-2 mt-2'> 
                <option  >.....</option>
                <option  value="ideas">ideas</option>
                <option value="notes">notes</option>
                <option value="questions">questions</option>
              </select>

              <label  className=' text-center lg:text-left lg:text-3xl text-2xl uppercase text-white mt-5'>descriptioncription</label>
             
              <textarea type='text' value={description} onChange={(e)=>setdescription(e.target.value)}  className=' border-2 rounded-[50px] p-5 mt-2' rows={10} cols={50}></textarea>
      <div className=' flex flex-wrap items-center justify-center'>  
            <button onClick={submit} className=' p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl  bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'>Submit</button>
            <button onClick={()=>setShow(true)} className=' p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl  bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'>Show Data</button>
        
      </div>
          </form>
      </div>
  }
 
    </>
    :""}

    </div>
  )
}

export default Thoughts