import React from "react";
import {Route,Routes} from 'react-router';
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Logout from './components/Logout';
import Profile from './components/Profile';

function App() {
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute/>} >
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/Logout" element={<Logout/>}/> 
      </Route>

      <Route path="/" element={<SignIn/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>

    </Routes>
    </>
  );
}

export default App;
