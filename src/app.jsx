import { useState } from 'preact/hooks'
import './app.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Checkout from './Pages/Checkout'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import ProductDetails from './Pages/ProductDetails'
import CartProvider from './context/CartContext'

export function App() {
  

  return (
    <>
      <AuthProvider>
        <CartProvider>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/auth' element={<Auth />} />
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/products/:id' element={<ProductDetails />}/>

         
        </Routes>
      </div>
        </CartProvider>
      </AuthProvider>
    </>
  )
}
