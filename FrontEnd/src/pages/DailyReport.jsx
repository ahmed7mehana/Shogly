import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDR } from "../rtx/api/DailyRepo";
import Form from "../components/Form";
import SHdata from "../components/SHdata";

function DailyReport() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const [pass, setPass] = useState("");
  const [Sh, setSh] = useState(false);

  const [loading, setLoading] = useState(false); // Loading state for form submission

  const SHpass = {
    z: "Z731Q",
    A: "A55A",
    AM: "A65M",
  };

  // Get all data when the page opens
  useEffect(() => {
    dispatch(GetAllDR());
  }, [dispatch]);

  const handlePasswordSubmit = () => {
    const validPasswords = Object.values(SHpass);
    if (validPasswords.includes(pass)) {
      setLoading(true); // Start loading spinner
      setTimeout(() => {
        setSh(true);
        setLoading(false); // Stop loading spinner
      }, 1000); // Simulating data retrieval delay
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <div className="min-h-screen bg-[#04152d] m-5">
      {!Sh ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <input
              placeholder="Enter Password"
              className="rounded-lg p-4 pr-10 pl-10 text-center"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              onClick={handlePasswordSubmit}
              className={`p-2 rounded-lg m-3 font-bold uppercase text-[20px] bg-[#19376d] bg-gradient-to-r from-[#90ade4] to-[#04152d] bg-[length:300%_100%] bg-left hover:bg-[length:100%_100%] hover:bg-right transition-all duration-500 ${
                loading ? "cursor-not-allowed opacity-50" : "text-[#04152d]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      ) : (
        <>
          {show ? (
            <SHdata pass={pass} SHpass={SHpass} setShow={setShow} />
          ) : (
            <Form show={show} setShow={setShow} />
          )}
        </>
      )}
    </div>
  );
}

export default DailyReport;
