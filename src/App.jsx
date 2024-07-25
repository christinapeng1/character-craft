import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {Home} from './pages';
import ChatStage from './pages/home/ChatStage';

const App = () => {
  return (
    <main className="bg-slate-300/20">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/chat/new" element={<NewChat />} />
            <Route path="/chat/:chatGroupId" element={<ChatScreen />} /> */}
          </Routes>
        </Router>
    </main>
  );
}

export default App