import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Line from "./components/chart/Line";
import Bar from "./components/chart/Bar";
// import Pie from "./components/Pie";

function App() {
  const test = 1;
  console.log(test);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈</h1>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
        <Route path="/bar" element={<Bar />}></Route>
        <Route path="/line" element={<Line />}></Route>
        {/* <Route path="/pie" element={<Pie />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
