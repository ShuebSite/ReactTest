import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import Routing from './Routing.jsx'
import Header from './components/Header';
import { useAuth } from "react-oidc-context";
import AuthInfo from './components/auth';

export default function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        {/* <AuthInfo /> debug:認証情報 */}
        <Routing />
      </BrowserRouter>
    </div>
  );
}

