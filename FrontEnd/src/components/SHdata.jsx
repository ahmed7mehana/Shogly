import React, { useState } from "react";
import UpdateFormDR from "./update/UpdateFormDR";
import { useDispatch, useSelector } from "react-redux";
import { deleteDR } from "../rtx/api/DailyRepo";

function SHdata({ pass, SHpass, setShow }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loadingDelete, setLoadingDelete] = useState(null); // Loading state for delete button
  const [loadingUpdate, setLoadingUpdate] = useState(null); // Loading state for update button
  const [Update, setUpdate] = useState(false);
  const [Uid, setUid] = useState(null);

  const { DailyReports } = useSelector((state) => state.DailyReport);
  const dispatch = useDispatch();

  // List of all months
  const allMonths = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const handleUpdate = (id, item) => {
    setUpdate(!Update);
    setUid(id);
  };

  const DelHandler = (id) => {
    setLoadingDelete(id); // Activate spinner for delete button
    dispatch(deleteDR(id)).then(() => {
      setLoadingDelete(null); // Deactivate spinner after deletion
      window.location.reload();
    });
  };

  // Get unique months from DailyReports
  const monthsWithData = [
    ...new Set(
      DailyReports.map((item) => new Date(item.createdAt).getMonth() + 1)
    ),
  ];

  // Filter data by selected month
  const filteredReports = DailyReports.filter((item) => {
    const itemMonth = new Date(item.createdAt).getMonth() + 1;
    return itemMonth === selectedMonth;
  });

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {pass === SHpass.z ? (
          ""
        ) : (
          <button
            onClick={() => setShow(false)}
            className="w-fit p-3 rounded-lg m-5 text-[#04152d] font-bold uppercase text-2xl bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:350%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500"
          >
            Show Form
          </button>
        )}

        <div className="flex flex-row items-center  m-5">
          <label className="text-white text-[20px] mr-3">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 rounded-lg"
          >
            {allMonths.map((month) => (
              <option
                key={month.value}
                value={month.value}
                disabled={!monthsWithData.includes(month.value)}
              >
                {month.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              window.print();
            }}
            className="m-3 p-2 rounded-lg hover:bg-[#576cbc] duration-200 hover:text-[#04152d] text-white text-[20px] border-2 border-white "
          >
            P
          </button>
        </div>

        {pass === SHpass.z ? (
          <div className="text-[#576cbc] text-[20px] border-4 text-center  border-[#cbd8e9] p-3 rounded-lg bg-[#19376d]">
            <p>
              I hope you have a wonderful day, Work is always exhausting, but I
              have confidence in your abilities
            </p>
          </div>
        ) : (
          <div className="text-[#576cbc] text-[20px] border-4 text-center  border-[#cbd8e9] p-3 rounded-lg bg-[#19376d]">
            <p> Love what you do, so u can hhhhh what you love</p>
          </div>
        )}

        <div className="flex flex-row flex-wrap justify-center  mt-10">
          {filteredReports.length === 0 ? (
            <p className="text-white text-xl">
              No data for the selected month.
            </p>
          ) : (
            filteredReports.map((item) => (
              <div
                key={item.id}
                className="border-2 text-white bg-[#19376d] min-w-[300px] m-5 p-6 rounded-lg"
                style={{
                  borderColor: `#${selectedMonth.toString().padStart(2, "0")}`,
                }}
              >
                {pass === SHpass.AM ? (
                  <div className="flex flex-row justify-between">
                    <button
                      className={`border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 ${
                        loadingDelete === item.id
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
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
                      className={`border-2 w-fit p-2 rounded-[20%] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 ${
                        loadingUpdate === item.id
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
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
                ) : (
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
                  <div className="flex flex-col justify-center">
                    <p className="text-left mt-3 font-bold text-[#04152d] border-b-2 uppercase">
                      Date:{" "}
                      {new Date(item.createdAt).toISOString().split("T")[0]}
                    </p>
                    {item.golash ? (
                      <p className="text-right text-[20px]">
                        جلاش : {item.golash} كرتونه
                      </p>
                    ) : (
                      ""
                    )}
                    {item.spreng ? (
                      <p className="text-right text-[20px]">
                        الاسبرنج : {item.spreng} كرتونه
                      </p>
                    ) : (
                      ""
                    )}
                    {item.Perished ? (
                      <p className="text-right text-[20px]">
                        هالك : {item.Perished} كيلو
                      </p>
                    ) : (
                      ""
                    )}
                    {item.Malfunctions ? (
                      <p className="text-right text-[20px] border-2 border-red-500 rounded-lg p-1">
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
    </div>
  );
}

export default SHdata;
