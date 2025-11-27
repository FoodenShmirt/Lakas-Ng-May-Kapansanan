import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { LoginSignup } from './Components/LogInSignup/LoginSignup';
import DashBoard from './Components/Dashboard/DashBoard';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
