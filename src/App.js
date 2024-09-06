import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Int from "./pages/Int";

import Ques from "./pages/Ques";
import Socials from "./pages/socials";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>VED AI</h1>
        </header>
        <Routes>
          <Route path="/" element={<Int />} />
          <Route path="/Ques" element={<Ques />} />
          <Route path="/Socials" element={<Socials />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
