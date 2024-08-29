import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Paper, TextField, Typography, Snackbar, ButtonGroup } from '@mui/material';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { Detail } from "./detail";
import RouteDetail from "../../Routing";
import AppRouter from "../../Routing";
import { GraphQL } from "./graphQL";

axios.defaults.withCredentials = false; // global に設定してしまう場合

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export function List() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onClickDetail = (id) => {
    navigate(`/detail/${id}`)
  }
  const onClickEdit = (id) => {
    navigate(`/edit/${id}`)
  }
  const onClickDelete = async (id) => {
    try {
      // REST API
      // const response = await axios.delete(`https://wish1ist.xyz/api/wishlist/${id}`, options);
      // setOpen(true);
      // window.location.reload();

      // GraphQL
      const response = await axios({
        url: GraphQL.ENDPOINT,
        method: 'post',
        headers: GraphQL.headers,
        timeout: GraphQL.REQUEST_TIMEOUT_MS,
        data: GraphQL.queryDeleteWish(id)
      })
      .then((res) => {
        console.log(res);
        setOpen(true);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log("error "+error.message);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const fetchData = async () => {
    // GraphQL
    await axios({
      url: GraphQL.ENDPOINT,
      method: 'post',
      headers: GraphQL.headers,
      timeout: GraphQL.REQUEST_TIMEOUT_MS,
      data: GraphQL.queryListWishes
    })
    .then((res) => {
        console.log(res);
        setData(res.data.data.listWishes.items);
    }).catch(error => {
        console.log(error);
    });

    // REST API のとき
    // const response = await axios.get('https://wish1ist.xyz/api/wishlist', options);
    // setData(response.data.wishlists);
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
      <Snackbar
        anchorOrigin={{ "vertical":"top", "horizontal":"center" }}
        open={open}
        autoHideDuration={5000}
        message="I love snacks"
        onClose={() =>{setOpen(false)}}
      />
      <h1>リスト</h1>
      <ul>
        {data.map((item) => (
          <div key={item.id}>
            <li>
            <h2>{item.title}</h2>
            <div>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button variant="contained" onClick={() => onClickDetail(item.id)}>詳細</Button>
              <Button variant="contained" onClick={() => onClickEdit(item.id)}>編集</Button>
              <Button variant="contained" onClick={() => onClickDelete(item.id)}>削除</Button>
            </ButtonGroup>
            
            <p><font size="2">作成: {new Date(item.created_at).toLocaleDateString()}<br/>
            更新: {new Date(item.updated_at).toLocaleDateString()}</font></p>
            {/* <p>更新: {new Date(item.updated_at).toLocaleDateString()}</p> */}
            </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
