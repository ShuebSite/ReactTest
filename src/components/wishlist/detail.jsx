import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = false; // global に設定してしまう場合

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const Detail = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const param = location.pathname.split('detail/')[1];

    useEffect(() => {
        try {
            if (param != null) {
                const fetchData = async () => {
                    const response = await axios.get(`http://ec2-13-211-239-192.ap-southeast-2.compute.amazonaws.com/api/wishlist/${param}`, options)
                    setData(response.data.wishlist);
                };
                fetchData();
            }
        } catch (error) {
          console.log("error "+error.message);
        }
      }, [param]); // paramが変わるたびにGETする

    return (
      <div>
        <h1>Detail {param}</h1>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>作成: {new Date(data.created_at).toLocaleDateString()}</p>
        <p>更新: {new Date(data.updated_at).toLocaleDateString()}</p>
      </div>
    );
  };