import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { Home } from "./components/Home";
import { List } from "./components/wishlist/list";
import { Form } from "./components/wishlist/form";
import { Game } from "./components/wishlist/game";
import { Detail } from "./components/wishlist/detail";
import { Edit } from "./components/wishlist/edit";

function AppRouter() {
  return (
      <div>
        <Header />
        
        <Routes>
          <Route path="/" exact element={Home()} />
          <Route path="/list/" element={List()} />
          <Route path="/form/" element={Form()} />
          <Route path="/game/" element={Game()} />
          <Route path="/detail/:id" element={Detail()} />
          <Route path="/edit/:id" element={Edit()} />
        </Routes>
      </div>
  );
}

export default AppRouter;