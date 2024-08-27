import React, { useState } from 'react';
import { updateDR } from '../../rtx/api/DailyRepo';
import { useDispatch } from 'react-redux';

function UpdateFormDR({ item, id, setUpdate, Update }) {
  const [golash, setGolash] = useState(item.golash);
  const [spreng, setSpreng] = useState(item.spreng);
  const [Perished, setPerished] = useState(item.Perished);
  const [Malfunctions, setMalfunctions] = useState(item.Malfunctions);

  const [loading, setLoading] = useState(false); // حالة التحميل

  const dispatch = useDispatch();

  const UPDATEhandeller = (id) => {
    const data = { golash, spreng, Perished, Malfunctions };
    setLoading(true); // تشغيل الـ "سبينر"
    dispatch(updateDR(data, id)).then(() => {
      setLoading(false); // إيقاف الـ "سبينر" بعد انتهاء العملية
      setUpdate(!Update);
      window.location.reload();
    });
  };

  return (
    <div className='flex flex-col p-1 text-black' key={item.id}>
      <div className='flex flex-row flex-wrap justify-between items-center'>
          <input value={golash} onChange={(e) => setGolash(e.target.value)} className='text-[20px] mt-2 w-[70%] rounded-lg text-center ' />
          <label className=' text-white text-[20px] '>  جلاش  </label>
        </div>

        <div className='flex flex-row flex-wrap justify-between items-center'>
        <input value={spreng} onChange={(e) => setSpreng(e.target.value)} className='text-[20px] mt-2 rounded-lg w-[70%] text-center' />
        <label className=' text-white text-[20px] '>  الاسبرنج  </label>
        </div>

        <div className='flex flex-row flex-wrap justify-between items-center'>
        <input value={Perished} onChange={(e) => setPerished(e.target.value)} className='text-[20px] mt-2 rounded-lg  w-[70%] text-center' />
        <label className=' text-white text-[20px] '>  الهالك  </label>
        </div>

        <div className='flex flex-col flex-wrap justify-between items-center mt-3'>
        <label className=' text-white text-[20px] '>  اعطال  </label>
        <textarea value={Malfunctions} onChange={(e) => setMalfunctions(e.target.value)} className=' text-end text-[20px]  rounded-lg p-1 w-[100%]' />
        </div>


      <button
        onClick={() => UPDATEhandeller(item.id)}
        className={`mt-3 p-2 rounded-lg bg-blue-500 text-white ${
          loading ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={loading} // تعطيل الزر أثناء التحميل
      >
        {loading ? (
          <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  );
}

export default UpdateFormDR;
