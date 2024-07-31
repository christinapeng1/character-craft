import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Home, NewChat } from "./pages";

const App = () => {
  return (
    <main className="bg-slate-300/20">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/new" element={<NewChat />} />
            <Route path="/chat/:chatGroupId" element={<NewChat />} />
          </Routes>
        </Router>
    </main>
  );
}

export default App