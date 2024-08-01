import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Int from './pages/Int';

import Quotes from './pages/Quotes';
import Ques from './pages/Ques'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Int />} />
          <Route path="/Ques" element={<Ques />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
