import React, { useState } from 'react'
import { createDR } from '../rtx/api/DailyRepo';
import { useDispatch } from 'react-redux';

function Form({show,setShow}) {
    const [golash, setgolash] = useState('');
    const [spreng, setspreng] = useState('');
    const [Perished, setPerished] = useState('');
    const [Malfunctions, setMalfunctions] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for form submission

    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();
        if (golash.trim() && Perished.trim() && Malfunctions.trim() === "") {
          console.log("no data here");
        } else {
          const data = { golash, spreng, Perished, Malfunctions };
          setLoading(true); // Activate spinner for submit button
  
          dispatch(createDR(data)).then(()=>{
            setLoading(false); // Deactivate spinner after submission
            window.location.reload();
          });
        }
      };

  return (
    <div className='flex flex-col justify-center items-center'>
  
      <h1 className='text-white text-4xl mt-10 text-center uppercase'>Let's write Daily Report... </h1>
    <form className='p-10 flex flex-col sm:w-[80%] w-full'>
    <div>
      <div className='flex flex-row justify-between'>
        <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>
          Production
        </label>
        <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>
          الانتاج
        </label>
      </div>
      <div className='flex flex-col'>
        <input
          placeholder=' كم انتاج الجلاش لليوم'
          value={golash}
          onChange={(e) => setgolash(e.target.value)}
          className='border-2 rounded-[50px] p-2 mt-2 text-center text-[20px]'
        />
        <input
          placeholder='كم انتاج الاسبرنج لليوم'
          value={spreng}
          onChange={(e) => setspreng(e.target.value)}
          className='border-2 rounded-[50px] p-2 mt-2 text-center text-[20px]'
        />
      </div>
    </div>
    <div className='flex flex-row justify-between mt-5'>
      <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>
        Perished
      </label>
      <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>
        الهالك
      </label>
    </div>
    <input
      value={Perished}
      onChange={(e) => setPerished(e.target.value)}
      className='border-2 rounded-[50px] p-2 mt-2'
      placeholder=' كم كميه الهالك لليوم '
    />
    <div className='flex flex-row justify-between mt-5'>
      <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>
        Malfunctions
      </label>
      <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>
        الاعطال
      </label>
    </div>
    <input
      value={Malfunctions}
      onChange={(e) => setMalfunctions(e.target.value)}
      className='border-2 rounded-[50px] p-2 mt-2'
      placeholder='فيه اعطال النهارده لقدر الله'
    />

    
<div className='flex flex-wrap items-center justify-center'>
        <button 
          onClick={submit} 
          className={`p-3 rounded-lg m-5 font-bold uppercase text-2xl bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 ${loading ? 'cursor-not-allowed opacity-50' : 'text-[#04152d]'}`} 
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
        <button 
          onClick={() => setShow(true)} 
          className='p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'
        >
          Show Data
        </button>
      </div>
      



  </form>
    
    </div>
  )
}

export default Form