import React from 'react'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'

import './App.css';
import { Header } from './components/header/Header'
import { Main } from './components/Main'
import { Footer } from './components/footer/Footer'

const AppLayout = (): JSX.Element =>
  <>
      <Header/>
      <Outlet/>
      <Footer/>
  </>


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path='/' element={<Main/>}/>
          <Route path='/about' element={<Main/>}/>
          <Route path='/menu' element={<Main/>}/>
          <Route path='/reservations' element={<Main/>}/>
          <Route path='/order' element={<Main/>}/>
          <Route path='/login' element={<Main/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
