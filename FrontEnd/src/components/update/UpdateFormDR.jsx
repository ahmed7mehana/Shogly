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
      <input value={golash} onChange={(e) => setGolash(e.target.value)} className='text-[25px] mt-2 rounded-lg' />
      <input value={spreng} onChange={(e) => setSpreng(e.target.value)} className='text-[25px] mt-2 rounded-lg' />
      <input value={Perished} onChange={(e) => setPerished(e.target.value)} className='text-[25px] mt-2 rounded-lg' />
      <input value={Malfunctions} onChange={(e) => setMalfunctions(e.target.value)} className='text-center mt-5 rounded-lg p-1' />

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
