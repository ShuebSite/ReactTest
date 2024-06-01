import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import Routing from './Routing.jsx'

export default function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        < Routing />
      </BrowserRouter>
    </div>
  );
}

