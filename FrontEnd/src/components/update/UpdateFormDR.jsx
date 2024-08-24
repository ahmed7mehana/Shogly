import React, { useState } from 'react'
import { updateDR } from '../../rtx/api/DailyRepo'
import { useDispatch } from 'react-redux'

function UpdateFormDR({item , id,setUpdate,Update}) {
  
  const [golash ,setgolash]=useState(item.golash)
  const [spreng ,setspreng]=useState(item.spreng)
  const [Perished ,setPerished]=useState(item.Perished)
  const [Malfunctions ,setMalfunctions]=useState(item.Malfunctions)

  const dispatch = useDispatch();

const UPDATEhandeller=(id)=>{
  const data={golash,spreng,Perished,Malfunctions}
  dispatch(updateDR(data,id));
  setUpdate(!Update)
  window.location.reload()

}
  return (
    <div className='flex flex-col p-1 text-black' key={item.id}>
      
    <input value={golash}  onChange={(e)=>setgolash(e.target.value)} className='  text-[25px] mt-2  rounded-lg '/>
    <input value={spreng}  onChange={(e)=>setspreng(e.target.value)} className='   text-[25px] mt-2  rounded-lg '/>
    <input value={Perished}  onChange={(e)=>setPerished(e.target.value)} className='  text-[25px] mt-2  rounded-lg '/>
    <input value={Malfunctions} onChange={(e)=>setMalfunctions(e.target.value)} className=' text-center mt-5 rounded-lg p-1 '/>
    
     <button  onClick={()=>UPDATEhandeller(item.id)}>Submit</button>

  </div> 
  )
}

export default UpdateFormDR