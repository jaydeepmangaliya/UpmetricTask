import { useState } from 'react'

import './App.css'
import LoginPage from './Pages/LoginPage'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import MyProfile from './Pages/MyProfile'
import Reset from './Pages/Reset'
import ResetPassword from './Pages/ResetPassword'



function App() {

  return (
    <>
    {/* <Navbar></Navbar> */}
     
     <Routes>
      <Route path='/' element={<Navigate to={'/Login'}></Navigate>}></Route>
      <Route path='/Home' element={<Home></Home>}> </Route>
      <Route path='/Login' element={<LoginPage></LoginPage>}> </Route>
      <Route path='/Signup' element={<Signup></Signup>}> </Route>
      <Route path='/Myprofile' element={<MyProfile></MyProfile>}></Route>
      <Route path='/Reset' element={<Reset></Reset>}></Route>
      <Route path='/reset-password/:id/:token' element={<ResetPassword></ResetPassword>}></Route>
    
     </Routes>
    </>
  )
}

export default App
