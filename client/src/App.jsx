import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import {Routes,Route} from "react-router-dom"
import Home from './pages/user/Home.jsx'

function App() {
  

  return (
    <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
    </Routes>
  )

}
export default App;
