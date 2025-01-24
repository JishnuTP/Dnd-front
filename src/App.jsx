import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Userprofile from './pages/Userprofile';
import ForgotPassword from './pages/Forgot';
import LandingPage from './pages/LandingPage';
import TaskManagement from './pages/task/task';
import Feed from './pages/dashboard/Feed';
import PrivateRoute from './route/PrivateRoute';
// import UserProfile from './pages/profile';







function App() {


  return (
   

    <Router>
    

    

     <Routes>
     
     <Route path="/" element={<LandingPage/>} />
     <Route path="/login" element={<Login />} />

     <Route path="/register" element={<Register/>}/>
     <Route path="/tasks" element={ <PrivateRoute> <TaskManagement/> </PrivateRoute>}/>

     <Route path="/feed" element={<PrivateRoute>  <Feed/> </PrivateRoute>}/>
     <Route path="/forgot-password" element={<ForgotPassword/>}/>

     <Route path="/profile" element={<PrivateRoute><Userprofile/>
      </PrivateRoute>}/>

     </Routes>
   
        
      
        
      
    
    </Router>
   

  );
}

export default App;
