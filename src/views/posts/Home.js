import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../../components/Post";
import axios from "axios";

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "60d8e27f10f8c263672cc965";

function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/post?limit=10`, { headers: { "app-id": APP_ID } })
      .then((response) => {
        console.log("hello", response.data);
        setPosts(response.data.data);
      })
      .catch((err) => {
        console.info(err);
      });
  }, []);

  return (
    <div className="home">
      <h1>Posts</h1>
      <div className="posts">
        {loading && "Loading..."}
        {/* {JSON.stringify(posts.length)} */}
        {posts.map((post) => (
          <div key={post.id}>
            <Post key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
