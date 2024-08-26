import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTHought, deleteThought, getAllThouhts } from '../rtx/api/ThoughtAPI';
import UpdateForm from '../components/update/UpdateForm';

function Thoughts() {
  const dispatch = useDispatch();
  const [Show, setShow] = useState(true);
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [loadingPage, setLoadingPage] = useState(false); // Loading state for page data
  const [loadingDelete, setLoadingDelete] = useState(null); // Loading state for delete button
  const [loadingUpdate, setLoadingUpdate] = useState(null); // Loading state for update button
  const [Update, setUpdate] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [Uid, setUid] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (description.trim() && title.trim() && category.trim() === "") {
      console.log("no data here");
    } else {
      const data = { title, description, category };
      setLoading(true); // Activate spinner for submit button
      dispatch(createTHought(data)).then(() => {
        setLoading(false); // Deactivate spinner after submission
        window.location.reload();
      });
    }
  };

  const DelHandler = (id) => {
    setLoadingDelete(id); // Activate spinner for delete button
    dispatch(deleteThought(id)).then(() => {
      setLoadingDelete(null); // Deactivate spinner after deletion
      window.location.reload();
    });
  };

  const handleUpdate = (id, item) => {
    setUpdate(!Update);
    setUid(id);
  };

  const handleUpdateSubmit = (id, data) => {
    setLoadingUpdate(id); // Activate spinner for update button
    dispatch(updateThought(id, data)).then(() => {
      setLoadingUpdate(null); // Deactivate spinner after update
      setUpdate(false); // Close the update form
      window.location.reload();
    });
  };

  const { Thoughts } = useSelector((state) => state.thought);

  useEffect(() => {
    if (pass === "111") {
      setLoadingPage(true); // Activate spinner for page loading
      dispatch(getAllThouhts()).then(() => {
        setLoadingPage(false); // Deactivate spinner after data is loaded
      });
    }
  }, [dispatch, pass]);

  

  return (
    <div className='min-h-screen bg-[#04152d] m-5 items-center'>
      {pass === "111" ? (
        loadingPage ? (
          <div className='flex justify-center items-center h-screen'>
            <div className="w-10 h-10 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {Show ? (
              <div className='flex flex-col justify-center items-center'>
                <button 
                  onClick={() => setShow(false)} 
                  className='w-fit p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:350%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'
                >
                  Show Form
                </button>
                <div className='flex flex-row flex-wrap h-fit m-10 justify-center items-center'>
                  {Thoughts.map((item) => (
                    <div className=' ' key={item.id}>
                      <div className="max-w-fit min-w-[300px] flex flex-col border-2 border-[#fff] text-white m-5 p-6 flex-row rounded-lg bg-[#19376d] bg-gradient-to-r from-[#19376d] to-[#6490e2] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500">
                        <div className='flex flex-row justify-between'>
                          <button 
                            className={`border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 ${loadingDelete === item.id ? 'cursor-not-allowed opacity-50' : ''}`} 
                            onClick={() => DelHandler(item.id)}
                            disabled={loadingDelete === item.id}
                          >
                            {loadingDelete === item.id ? (
                              <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                            ) : (
                              "X"
                            )}
                          </button>
                          <button 
                            className={`border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 ${loadingUpdate === item.id ? 'cursor-not-allowed opacity-50' : ''}`} 
                            onClick={() => handleUpdate(item.id, item)}
                            disabled={loadingUpdate === item.id}
                          >
                            {loadingUpdate === item.id ? (
                              <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                            ) : (
                              "E"
                            )}
                          </button>
                        </div>
                        {Update && Uid === item.id ? (
                          <UpdateForm 
                            item={item} 
                            id={item.id} 
                            Update={Update} 
                            setUpdate={setUpdate}
                            handleUpdateSubmit={handleUpdateSubmit}
                          />
                        ) : (
                          <div className='' key={item.id}>
                            <p className='text-right text-[25px]'>{item.title}</p>
                            <p className='text-left font-bold text-[#576cbc] border-b-2 uppercase'>{item.category}</p>
                            <p className='text-center mt-5'>{item.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='flex justify-center items-center flex-col'>
                <h1 className='text-white text-4xl mt-10 text-center uppercase'>
                  Let's write ideas, notes, questions...
                </h1>
                <form className='p-10 flex flex-col sm:w-[80%] w-full'>
                  <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white'>Title</label> 
                  <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 rounded-[50px] p-2 mt-2' placeholder='Write a good title' />

                  <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white mt-5'>Choose a category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} name="kind" id="kind" className='border-2 rounded-[50px] p-2 mt-2'> 
                    <option>.....</option>
                    <option value="ideas">Ideas</option>
                    <option value="notes">Notes</option>
                    <option value="questions">Questions</option>
                  </select>

                  <label className='text-center lg:text-left lg:text-3xl text-2xl uppercase text-white mt-5'>Description</label>
                  <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='border-2 rounded-[50px] p-5 mt-2' rows={10} cols={50}></textarea>

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
            )}
          </>
        )
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <input 
            placeholder='Password' 
            className='rounded-lg p-4 pr-10 pl-10 text-center' 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
          />
        </div>
      )}
    </div>
  );
}

export default Thoughts;
