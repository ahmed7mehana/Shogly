import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Thoughts from "./pages/Thoughts";
import DailyReport from "./pages/DailyReport";

function App() {
  return (
    <div >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Thoughts" element={<Thoughts />} />       
        <Route path="/DailyReport" element={<DailyReport />} />       
      </Routes>
    </BrowserRouter>

  
    </div>
  );
}

export default App;
