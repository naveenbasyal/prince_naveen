import React from "react";
import "../styles/posts.css";
const Posts = () => {
  return (
    <>
      <div className="post_nav">
        <div className="post_nav_left">
          <i className="fa-solid fa-arrow-left"></i>
          <h3 className="board_name">places around the world</h3>
          <div className="board_nav_left_img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M2oXreMxXifWakF_qE6WO0kYkm7Gcl1-uGsuXics0A&s"
              alt=""
            />
          </div>
        </div>
        <div className="post_nav_right">
          <i className="fa-solid fa-search"></i>
          <i className="fa-solid fa-bookmark"></i>
        </div>
      </div>
      <div className="post_header">
        <h3>Your posts</h3>
        <div className="create_posts">
          <i className="fa-solid fa-plus"></i>
          <button>Create new Post</button>
        </div>
      </div>
    </>
  );
};

export default Posts;
