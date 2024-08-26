import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Thoughts from "./pages/Thoughts";
import DailyReport from "./pages/DailyReport";

function App() {
  return (
    
    <BrowserRouter>
    <div className="APP">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Thoughts" element={<Thoughts />} />       
        <Route path="/DailyReport" element={<DailyReport />} />       
      </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
