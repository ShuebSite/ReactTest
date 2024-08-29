import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography, Box, Snackbar } from '@mui/material';
import axios from "axios";
import { GraphQL } from "./graphQL";

axios.defaults.withCredentials = false; // global に設定してしまう場合

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const Edit = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const param = location.pathname.split('edit/')[1];
    const [isLoadCompleted, setIsLoadComplete] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const onClick = ()=>{
      try {
        if (param != null) {
            const putData = async () => {
              // REST API
              // const response = await axios.put(`https://wish1ist.xyz/api/wishlist/${param}`,data, options)
              // // setData(response.data.wishlist);
              // console.log(response);
              // // 成功メッセージを表示
              // setOpen(true);
              // navigate(`/list/`);
              // window.location.reload();

              // GraphQL
              const response = await axios({
                url: GraphQL.ENDPOINT,
                method: 'post',
                headers: GraphQL.headers,
                timeout: GraphQL.REQUEST_TIMEOUT_MS,
                data: GraphQL.queryUpdateWish(param, data)
              })
              .then((res) => {
                console.log(res);
                setOpen(true);
                navigate(`/list/`);
                window.location.reload();
              }).catch(error => {
                console.log(error);
              });
            };
            putData();
        }
      } catch (error) {
        console.log("error "+error.message);
      }
    }

    const onChange = () => {
      let title = document.forms.putForm.title.value;
      let content = document.forms.putForm.content.value;
      //dataをオブジェクトにしてセット
      setData({
        title: title,
        content: content,
      });
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    useEffect(() => {
        try {
            if (param != null) {
                const fetchData = async () => {
                  // REST API
                  // const response = await axios.get(`https://wish1ist.xyz/api/wishlist/${param}`, options)
                  // setData(response.data.wishlist);
                  // setIsLoadComplete(true);

                  // GraphQL
                  const response = await axios({
                    url: GraphQL.ENDPOINT,
                    method: 'post',
                    headers: GraphQL.headers,
                    timeout: GraphQL.REQUEST_TIMEOUT_MS,
                    data: GraphQL.queryGetWish(param)
                  })
                  .then((res) => {
                    console.log(res);
                    setData(res.data.data.getWish);
                    setIsLoadComplete(true);
                  }).catch(error => {
                    console.log(error);
                  });
                };
                fetchData();
            }
        } catch (error) {
          console.log("error "+error.message);
        }
      }, [param]); // paramが変わるたびにGETする

    return (
      <div>
        <h1>Edit {param}</h1>
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Note archived"
        // action={action}
        />
        <form name="putForm" onChange={onChange} disabled={!isLoadCompleted}>
        <Box display="flex" flexDirection="column" >
          <TextField
          name='title'
          required
          disabled={!isLoadCompleted}
          variant={ !isLoadCompleted ? "filled" : "standard"}
          id="title"
          label="wishタイトル"
          defaultValue={data.title}
          fullWidth
          />
          <br />
          <TextField
          name='content'
          required
          disabled={!isLoadCompleted}
          variant={ !isLoadCompleted ? "filled" : "standard"}
          id="content"
          label="詳細"
          defaultValue={data.content}
          fullWidth
          multiline
          />
        </Box>
        <br />
        <Button variant="contained" onClick={onClick} disabled={!isLoadCompleted}>更新</Button>
        </form>
      </div>
    );
  };