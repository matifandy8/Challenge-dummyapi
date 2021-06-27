import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "60d8e27f10f8c263672cc965";

function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);

  // 60d21baa67d0d8992e610da7
  const handleClickComments = async (id) => {
    console.log(id);
    const response = await axios
      .get(`${BASE_URL}/post/${id}/comment?limit=10`, {
        headers: { "app-id": APP_ID },
      })
      .then((response) => {
        console.log(id, response.data);
        setComments(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickUser = async (idem) => {
    console.log(idem);
    const response = await axios
      .get(`${BASE_URL}/user/${idem}`, {
        headers: { "app-id": APP_ID },
      })
      .then((response) => {
        console.log(idem, response.data);
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="card" key={post.id}>
        <div className="owner">
          <img src={post.owner.picture} alt="John" />
          <div class="modal-container">
            <input id="modal-toggle" type="checkbox" />
            <button>
              {post.owner.firstName}
              {post.owner.lastName}
            </button>
            <div className="modal-backdrop">
              <div className="modal-content">
                <label className="modal-close" for="modal-toggle">
                  x
                </label>
                <button
                  className="fetch-button"
                  key={post.owner.id}
                  onClick={() => handleClickUser(post.owner.id)}
                >
                  Fetch User
                </button>
                <hr />
                <div key={userData.id}>
                  <img src={userData.picture} alt="John" />
                  <p>{userData.dateOfBirth}</p>
                  <p>{userData.phone}</p>
                  <p>{userData.gender}</p>
                  <p>{userData.registerDate}</p>
                </div>

                <label className="modal-close button" for="modal-toggle">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
        <img src={post.image} alt="John" />
        <p className="title">{post.text}</p>
        <p>Likes{post.likes}</p>
        <p>{post.publishDate}</p>
        <a href={post.link} target="_blank">
          Instagram
        </a>
        <div class="modal-container">
          <input id="modal-toggle" type="checkbox" />
          <button>Comments</button>
          <div className="modal-backdrop">
            <div className="modal-content">
              <label className="modal-close" for="modal-toggle">
                x
              </label>
              <button
                className="fetch-button"
                key={post.id}
                onClick={() => handleClickComments(post.id)}
              >
                Fetch Comments
              </button>
              <hr />
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.message}</p>
                </div>
              ))}
              <label className="modal-close button" for="modal-toggle">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
