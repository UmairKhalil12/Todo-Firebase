import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/User/Home/Home'
import Login from '../Pages/Auth/Login/Login'
import Signup from '../Pages/Auth/Signup/Signup'
import appStore from '../zustand/appStore';

export default function Routing() {
    const { user } = appStore((state) => ({ user: state.user }));
    
    return (
        <BrowserRouter>
            <Routes>
                {user ? <Route path='/' element={<Home />} /> : <Route path="/" element={<Login />} />}
                {user ? <Route path='/home' element={<Home />} /> : <Route path="/home" element={<Login />} />}
                {user ? <Route path='/home' element={<Home />} /> : <Route path="/login" element={<Login />} />}
                {user ? <Route path='/home' element={<Home />} /> : <Route path="/signup" element={<Signup />} />}
            </Routes>
        </BrowserRouter>
    )
}
