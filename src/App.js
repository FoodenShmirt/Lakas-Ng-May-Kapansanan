import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { LoginSignup } from './Components/LogInSignup/LoginSignup';
import  DashBoard  from './Components/Dashboard/DashBoard';
import { useState } from 'react';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
