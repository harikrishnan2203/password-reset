import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import { useAuthContext } from './context/AuthContext';
import ForgotPassword from './Pages/forgotPassword';
import SetNewPassword from './Pages/SetNewPassword';




function App() {
  const { isLoggedIn } = useAuthContext();
  // console.log(isLoggedIn)
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/update-password/:token" element={<SetNewPassword/>} />
          </>
        )}
        {isLoggedIn && <Route path="/home" element={<Home />} />}
      </Routes>
    </div>
  );
}

export default App;
