import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';

axios.defaults.withCredentials = false; // global に設定してしまう場合

export function Form() {
  const [data, setData] = useState([]);

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
  await axios.post('http://127.0.0.1:8000/api/wishlist',data)
  .then((res) => {
      setData('');
      // location.href = 'http://127.0.0.1:8000';
      console.log(res);
      // 成功メッセージを表示
  }).catch(error => {
      console.log(error);
  });
}

  return (
    <div>
      <h1>投稿</h1>
      <form name="postForm" onChange={onChange}>
        <TextField name='title' label="wishタイトル" variant="standard" className="text" />
        <TextField name='content' label="詳細" variant="standard" className="text" />
        <Button variant="contained" onClick={onClick}>投稿</Button>
      </form>
    </div>
  );
};
