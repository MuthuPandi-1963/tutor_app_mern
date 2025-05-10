import React from "react";

import Register from "./pages/auth/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import HomeLayout from "./components/Home/HomeLayout";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";

const App = () => {
  const userData = useSelector(state=>state.auth)
  console.log(userData.data);
  
  return (
    <>
    <Routes>
      <Route path="/" element={<HomeLayout/>}>
      <Route path="" element={<Home/>} />  
      <Route path="register" element={<Register/>} />  
      <Route path="login" element={<Login/>} />  
      </Route>
      
    </Routes>
    </>
  );
};

export default App;
