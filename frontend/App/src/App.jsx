import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBookComponent from './components/CreateBookComponent';
import ListBookComponent from './components/ListBookComponent';

function App() {
  return (
   <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/">
            <Route path="" element={<ListBookComponent />} />
            
          </Route>
         </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
    
  );
}

export default App;
