import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDR, deleteDR, GetAllDR } from '../rtx/api/DailyRepo';
import UpdateFormDR from '../components/update/UpdateFormDR';

function DailyReport() {
  const dispatch = useDispatch();

 
  const [show, setShow] = useState(true);
  const [Update, setUpdate] = useState(false);
  const [Uid, setUid] = useState(null);
  const [pass, setPass] = useState('');
  const [Sh, setSh] = useState(false);
  const [golash, setgolash] = useState('');
  const [spreng, setspreng] = useState('');
  const [Perished, setPerished] = useState('');
  const [Malfunctions, setMalfunctions] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  
  const SHpass = {
    z: "Z731Q",
    A: "A555A",
    AM: "A989M"
  };


  const submit = (e) => {
    e.preventDefault();
    if (golash.trim() && Perished.trim() && Malfunctions.trim() === "") {
      console.log("no data here");
    } else {
      const data = { golash, spreng, Perished, Malfunctions };
      dispatch(createDR(data));
      window.location.reload();
    }
  };

  const { DailyReports } = useSelector((state) => state.DailyReport);

  // List of all months
  const allMonths = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  // Get unique months from DailyReports
  const monthsWithData = [...new Set(DailyReports.map(item => new Date(item.createdAt).getMonth() + 1))];

  // Filter data by selected month
  const filteredReports = DailyReports.filter((item) => {
    const itemMonth = new Date(item.createdAt).getMonth() + 1;
    return itemMonth === selectedMonth;
  });

  // Get all data when the page opens
  useEffect(() => {
    dispatch(GetAllDR());
  }, [dispatch]);

  const handleUpdate = (id, item) => {
    setUpdate(!Update);
    setUid(id);
  };

  const DelHandler = (id) => {
    dispatch(deleteDR(id));
    window.location.reload();
  };

  const handlePasswordSubmit = () => {
    // Check if the entered password matches any value in SHpass
    const validPasswords = Object.values(SHpass);
    if (validPasswords.includes(pass)) {
      setSh(true);
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <div className='min-h-screen bg-[#04152d] m-5'>
      {!Sh ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='flex flex-col items-center'>
            <input
              placeholder='Enter Password'
              className='rounded-lg p-4 pr-10 pl-10 text-center'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              className='mt-4 p-2 rounded-lg bg-[#19376d] text-white'
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          {show ? (
            <>
              <div className='flex flex-col justify-center items-center'>
                {pass === SHpass.z?
                ""
                :
                <button
                onClick={() => setShow(false)}
                className='w-fit p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:350%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'
              >
                Show Form
              </button>}
       

                <div className='flex flex-row items-center  m-5'>
                  <label className='text-white text-[20px] mr-3'>Select Month:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className='p-2 rounded-lg'
                  >
                    {allMonths.map(month => (
                      <option
                        key={month.value}
                        value={month.value}
                        disabled={!monthsWithData.includes(month.value)}
                      >
                        {month.label}
                      </option>
                    ))}
                  </select>

                  <button onClick={()=>{window.print()}} className='m-3 p-2 rounded-lg hover:bg-[#576cbc] duration-200 hover:text-[#04152d] text-white text-[20px] border-2 border-white '>P</button>
               
                </div>

                  {pass === SHpass.z?
                   <div className='text-[#576cbc] text-[20px] border-4 text-center  border-[#cbd8e9] p-3 rounded-lg bg-[#19376d]' >
                   <p>I hope you have a wonderful day, Work is always exhausting, but I have confidence in your abilities</p>
                  </div>
                  : 
                  <div className='text-[#576cbc] text-[20px] border-4 text-center  border-[#cbd8e9] p-3 rounded-lg bg-[#19376d]' >
                  <p> Love what you do, so u can hhhhh what you love</p>
                 </div>

                  }
                  
                <div className='flex flex-row flex-wrap justify-center  mt-10'>
                  
                  {filteredReports.length === 0 ? (
                    <p className='text-white text-xl'>No data for the selected month.</p>
                  ) : (
                    filteredReports.map((item) => (
                      <div
                        key={item.id}
                        className='border-2 text-white bg-[#19376d] min-w-[300px] m-5 p-6 rounded-lg'
                        style={{ borderColor: `#${selectedMonth.toString().padStart(2, '0')}` }}
                      >
                        {pass === SHpass.AM ? (
                          <div className='flex flex-row justify-between'>
                            <button
                              className='border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'
                              onClick={() => DelHandler(item.id)}
                            >
                              X
                            </button>
                            <button
                              className='border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'
                              onClick={() => handleUpdate(item.id, item)}
                            >
                              E
                            </button>
                          </div>
                        ) : (
                        //   <div className='flex flex-row justify-between'>
                        //     <></>
                        //   <button
                        //     className='border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500'
                        //     onClick={() => handleUpdate(item.id, item)}
                        //   >
                        //     E
                        //   </button>
                        // </div>
                        ""
                        )}
                        {Update && Uid === item.id ? (
                          <UpdateFormDR
                            item={item}
                            id={Uid}
                            Update={Update}
                            setUpdate={setUpdate}
                          />
                        ) : (
                          <div className='flex flex-col justify-center'>
                            <p className='text-left mt-3 font-bold text-[#04152d] border-b-2 uppercase'>
                              Date: {new Date(item.createdAt).toISOString().split('T')[0]}
                            </p>
                            {item.golash ? (
                              <p className='text-right text-[20px]'>جلاش : {item.golash} كرتونه</p>
                            ) : (
                              ""
                            )}
                            {item.spreng ? (
                              <p className='text-right text-[20px]'>الاسبرنج : {item.spreng} كرتونه</p>
                            ) : (
                              ""
                            )}
                            {item.Perished ? (
                              <p className='text-right text-[20px]'>هالك : {item.Perished} كيلو</p>
                            ) : (
                              ""
                            )}
                            {item.Malfunctions ? (
                              <p className='text-right text-[20px] border-2 border-red-500 rounded-lg p-1'>
                                عطل : {item.Malfunctions}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-white text-4xl mt-10 text-center uppercase'>
                Let's write Daily Report...
              </h1>
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
                      placeholder='جلاش'
                      value={golash}
                      onChange={(e) => setgolash(e.target.value)}
                      className='border-2 rounded-[50px] p-2 mt-2 text-center text-[20px]'
                    />
                    <input
                      placeholder='الاسبرنج'
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
                />
                <div className='flex flex-row justify-center items-center'>
                  <button
                    onClick={submit}
                    className='bg-[#19376d] p-3 rounded-lg m-5 mt-5 text-[#576cbc] font-bold uppercase text-2xl'
                  >
                    Submit
                  </button>
                  <button className='bg-[#19376d] p-3 rounded-lg m-5 mt-5 text-[#576cbc] font-bold uppercase text-2xl'>
                    SHOW
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DailyReport;
