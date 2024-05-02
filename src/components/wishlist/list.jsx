import axios from "axios";
import { useCallback, useEffect, useState } from "react";

axios.defaults.withCredentials = false; // global に設定してしまう場合

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export function List() {
  const [data, setData] = useState([]);


  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/wishlist', options)
        setData(response.data.wishlists);
      };
  
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
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>作成日時: {item.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
