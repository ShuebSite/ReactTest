import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal, Paper, TextField, Typography, Box, Snackbar } from '@mui/material';
import axios from "axios";

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
                const response = await axios.put(`http://ec2-13-211-239-192.ap-southeast-2.compute.amazonaws.com/api/wishlist/${param}`,data, options)
                // setData(response.data.wishlist);
                console.log(response);
                // 成功メッセージを表示
                setOpen(true);
                navigate(`/list/`);
                window.location.reload();
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
                    const response = await axios.get(`http://ec2-13-211-239-192.ap-southeast-2.compute.amazonaws.com/api/wishlist/${param}`, options)
                    setData(response.data.wishlist);
                    setIsLoadComplete(true);
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