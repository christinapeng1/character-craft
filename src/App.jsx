import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {Home} from './pages';
import Login from './components/auth/login';
import Register from "./components/auth/register";
import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <main className="bg-slate-300/20">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </main>
  );
}

export default App