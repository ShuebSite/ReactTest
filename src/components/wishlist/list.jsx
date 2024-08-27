import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Paper, TextField, Typography, Snackbar, ButtonGroup } from '@mui/material';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { Detail } from "./detail";
import RouteDetail from "../../Routing";
import AppRouter from "../../Routing";

axios.defaults.withCredentials = false; // global に設定してしまう場合

const ENDPOINT = import.meta.env.VITE_WISHLIST_GRAPHQL_ENDPOINT;
const API_KEY = import.meta.env.VITE_WISHLIST_GRAPHQL_API_KEY;
const REQUEST_TIMEOUT_MS = 5000;

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const headers = {
  "content-type": "application/json",
  "x-api-key": API_KEY
}

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
      const response = await axios.delete(`https://wish1ist.xyz/api/wishlist/${id}`, options);
      setOpen(true);
      window.location.reload();
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
    // test
    console.log("endpoint, key "+ENDPOINT+", "+API_KEY)

    // GraphQL API
    const graphqlQuery = {
      "operationName": "getWishes",
      "query": `query getWishes {
       listWishes {
        items {
          id 
          content 
          title
          }
        }
       }`,
      "variables": {}
    };
   
    await axios({
      url: ENDPOINT,
      method: 'post',
      headers: headers,
      timeout: REQUEST_TIMEOUT_MS,
      data: graphqlQuery
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
