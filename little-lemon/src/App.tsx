import React from 'react'
import { Routes, Route,BrowserRouter } from 'react-router-dom'

import './App.css';
import { Header } from './components/header/Header'
import { Main } from './components/Main'
import { Footer } from './components/footer/Footer'

function App() {
  return (
    <React.Fragment>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/about' element={<Main/>}/>
        <Route path='/menu' element={<Main/>}/>
        <Route path='/reservations' element={<Main/>}/>
        <Route path='/order' element={<Main/>}/>
        <Route path='/login' element={<Main/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
