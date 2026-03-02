import { useState } from 'preact/hooks'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Checkout from './Pages/Checkout'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'

export function App() {
  

  return (
    <>
      <AuthProvider>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/auth' element={<Auth />} />
          <Route path='/checkout' element={<Checkout />}/>

         
        </Routes>
      </div>
      </AuthProvider>
    </>
  )
}
