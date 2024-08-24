import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateTHought } from '../../rtx/api/ThoughtAPI';
import { useNavigate } from 'react-router-dom';

function UpdateForm({item,setUpdate,Update,id}) {

  const Navigate=useNavigate() 
  const dispatch = useDispatch();

const [title, settitle]=useState(item.title)
const [category , setcategory]=useState(item.category)
const [description , setdescription]=useState(item.description)


const UPDATEhandeller=(id)=>{

    const data={title,description,category}
    dispatch(updateTHought(data,id));
    setUpdate(!Update)
    window.location.reload()

}
  return (

   
      <div className='flex flex-col p-1' key={item.id}>
      
      <input  value={title}  onChange={(e)=>settitle(e.target.value)} className=' bg-black   text-[25px] mt-2  rounded-lg '/>
          <select value={category} onChange={(e)=>setcategory(e.target.value)}  name="kind" id="kind" className=' bg-black border-2 rounded-[50px] p-2 mt-2'> 
                  <option  >.....</option>
                  <option  value="ideas">ideas</option>
                  <option value="notes">notes</option>
                  <option value="questions">questions</option>
      </select>
      <input value={description}   onChange={(e)=>setdescription(e.target.value)} className=' text-center mt-5 rounded-lg p-1 bg-black'/>
      
       <button className='mt-3 border-2 border-white rounded-lg'  onClick={()=>UPDATEhandeller(item.id)}>Submit</button>
  
    </div> 
 
  
    
  )
}

export default UpdateForm