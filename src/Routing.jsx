import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from "./components/Home";
import { List } from "./components/wishlist/list";

function User() {
  return <h2>ユーザー</h2>;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">ホーム</Link>
            </li>
            <li>
              <Link to="/user/">ユーザー</Link>
            </li>
            <li>
              <Link to="/list/">リスト</Link>
            </li>
          </ul>
        </nav>
        <Link to="/user/">User</Link>
        <Routes>
          <Route path="/" exact element={Home()} />
          <Route path="/user/" element={User()} />
          <Route path="/list/" element={List()} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;