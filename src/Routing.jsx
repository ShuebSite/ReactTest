import React from 'react';
import { useAuth } from "react-oidc-context";
import Header from './components/Header';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { Home } from "./components/Home";
import { List } from "./components/wishlist/list";
import { Form } from "./components/wishlist/form";
import { Game } from "./components/wishlist/game";
import { Detail } from "./components/wishlist/detail";
import { Edit } from "./components/wishlist/edit";
import { Email } from "./components/wishlist/email";
import Login from './components/loginItem';
import Loading from './components/loading';
import { AuthError } from './components/auth';

function AppRouter() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <AuthError error={auth.error} />

      {auth.isAuthenticated ? (
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/list/" element={<List />} />
          <Route path="/form/" element={<Form />} />
          <Route path="/game/" element={<Game />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/email/" element={<Email />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default AppRouter;