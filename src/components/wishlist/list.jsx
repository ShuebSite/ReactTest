import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { Detail } from "./detail";
import RouteDetail from "../../Routing";
import AppRouter from "../../Routing";

axios.defaults.withCredentials = false; // global に設定してしまう場合

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export function List() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const onClickDetail = (id) => {
    navigate(`/detail/${id}`)
  }
  const onClickEdit = (id) => {
    navigate(`/edit/${id}`)
  }
  const onClickDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/wishlist/${id}`, options);
      window.location.reload();
    } catch (error) {
      console.log("error "+error.message);
    }
  }


  const fetchData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/wishlist', options);
    setData(response.data.wishlists);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("error "+error.message);
    }
  }, []);

  return (
    <div>
      <h1>リスト</h1>
      <ul>
        {data.map((item) => (
          <div key={item.id}>
            <li>
            <h2>{item.title}</h2>
            {/* <p>{item.content}</p> */}
            <p>作成日時: {item.created_at}</p>
            <div>
              <Button variant="contained" onClick={() => onClickDetail(item.id)}>詳細</Button>
              <Button variant="contained" onClick={() => onClickEdit(item.id)}>編集</Button>
              {/* <Button variant="contained" onClick={onClickEdit}>編集</Button>
              <Button variant="contained" onClick={onClickDelete}>削除</Button> */}
            </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
