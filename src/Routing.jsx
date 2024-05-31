import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from "./components/Home";
import { List } from "./components/wishlist/list";
import { Form } from "./components/wishlist/form";
import { Game } from "./components/wishlist/game";

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
              <Link to="/list/">リスト</Link>
            </li>
            <li>
              <Link to="/form/">投稿</Link>
            </li>
            <li>
              <Link to="/game/">三目並べゲーム</Link>
            </li>
          </ul>
        </nav>
        {/* <Link to="/user/">User</Link> */}
        <Routes>
          <Route path="/" exact element={Home()} />
          <Route path="/list/" element={List()} />
          <Route path="/form/" element={Form()} />
          <Route path="/game/" element={Game()} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;