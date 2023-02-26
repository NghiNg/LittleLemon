import React from 'react'
import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom'

import './App.css';
import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
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
          <Route path={'/*'} element={<Main/>}/>
          <Route path='/about' element={<h1>ABOUT</h1>}/>
          <Route path='/menu' element={<h1>MENU</h1>}/>
          <Route path='/reservations' element={<h1>RESERVATIONS</h1>}/>
          <Route path='/login' element={<h1>LOGIN</h1>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
