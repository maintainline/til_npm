import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const test = 1;
  console.log(test);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈</h1>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
