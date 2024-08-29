import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography, Box } from '@mui/material';
import { GraphQL } from "./graphQL";

axios.defaults.withCredentials = false; // global に設定してしまう場合

export function Form() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const onChange = () => {
    let title = document.forms.postForm.title.value;
    let content = document.forms.postForm.content.value;
    //dataをオブジェクトにしてセット
    setData({
      title: title,
      content: content,
    });
}

const onClick = async()=>{
  // REST API
  // await axios.post('https://wish1ist.xyz/api/wishlist',data)
  // .then((res) => {
  //     setData('');
  //     // location.href = 'http://127.0.0.1:8000';
  //     console.log(res);
  //     // 成功メッセージを表示
  //     navigate(`/list/`);
  // }).catch(error => {
  //     console.log(error);
  // });

  // GraphQL
  await axios({
    url: GraphQL.ENDPOINT,
    method: 'post',
    headers: GraphQL.headers,
    timeout: GraphQL.REQUEST_TIMEOUT_MS,
    data: GraphQL.queryCreateWish(data)
  })
  .then((res) => {
      console.log(res);
      navigate(`/list/`);
      window.location.reload();
  }).catch(error => {
      console.log(error);
  });
}

  return (
    <div>
      <h1>投稿</h1>
      <form name="postForm" onChange={onChange}>
      <Box display="flex" flexDirection="column" >
          <TextField
          name='title'
          required
          id="title"
          label="wishタイトル"
          fullWidth
          />
          <br />
          <TextField
          name='content'
          required
          id="content"
          label="詳細"
          fullWidth
          multiline
          />
        </Box>
        <br />
        <Button variant="contained" onClick={onClick}>投稿</Button>
      </form>
    </div>
  );
};
