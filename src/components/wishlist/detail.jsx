import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { GraphQL } from "./graphQL";

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
                  // REST API
                  // const response = await axios.get(`https://wish1ist.xyz/api/wishlist/${param}`, options)
                  // setData(response.data.wishlist);

                  // GraphQL
                  const response = await axios({
                    url: GraphQL.ENDPOINT,
                    method: 'post',
                    headers: GraphQL.headers,
                    timeout: GraphQL.REQUEST_TIMEOUT_MS,
                    data: GraphQL.queryGetWish(param)
                  })
                  .then((res) => {
                    setData(res.data.data.getWish);
                  })
                  .catch(error => {
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
        <h1>詳細</h1>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <p>作成: {new Date(data.created_at).toLocaleDateString()}</p>
        <p>更新: {new Date(data.updated_at).toLocaleDateString()}</p>
      </div>
    );
  };