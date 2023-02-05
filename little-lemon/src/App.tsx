import React from 'react'
import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom'

import './App.css';
import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { BookingPage } from './components/bookingPage/BookingPage'
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
          <Route path={'/'} element={<Navigate to="/home"/>}/>
          <Route path={'/home/*'} element={<Main/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
