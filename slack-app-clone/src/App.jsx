import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ChatPage from './pages/Chat';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signUp' element={<SignUpPage/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
