import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';

// import { getEncryptedCookie } from './utils/cookieUtils.js';




function App() {
  const [count, setCount] = useState(0)



  useEffect(() => {
    
    // const userToken = getEncryptedCookie("user");
    if (userToken) {
      
      console.log("User is authenticated:", userToken);
    } else {

      console.log("User is not authenticated");
    }
  }, []);

  return (
    <>

    <BrowserRouter>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
        
    </BrowserRouter>
     
    </>
  )
}

export default App
