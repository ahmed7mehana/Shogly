import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTHought } from '../../rtx/api/ThoughtAPI';

function UpdateForm({ item, setUpdate, Update, id }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [description, setDescription] = useState(item.description);
  const [loading, setLoading] = useState(false); // حالة التحميل لزر "Submit"

  const UPDATEhandeller = (id) => {
    const data = { title, description, category };
    setLoading(true); // تفعيل السبانر عند بدء عملية التحديث
    dispatch(updateTHought(data, id)).finally(() => {
      setLoading(false); // تعطيل السبانر بعد اكتمال العملية
      setUpdate(!Update);
      window.location.reload();
    });
  };

  return (
    <div className='flex flex-col p-1 ' key={item.id}>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className='bg-black text-[25px] mt-2 rounded-lg ' 
      />
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        name="kind" 
        id="kind" 
        className='bg-black border-2 rounded-[50px] p-2 mt-2'
      > 
        <option>.....</option>
        <option value="ideas">ideas</option>
        <option value="notes">notes</option>
        <option value="questions">questions</option>
      </select>
      <input 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className='text-center mt-5 rounded-lg p-1 bg-black' 
      />
      <button 
        className={`mt-3 border-2 border-white rounded-lg p-2 items-center text-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`} 
        onClick={() => UPDATEhandeller(item.id)}
        disabled={loading} // تعطيل الزر عند تحميل البيانات
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

export default UpdateForm;
