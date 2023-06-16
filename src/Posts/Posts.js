import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../Context/BoardProvider";
import "../styles/posts.css";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { boards } = useContext(BoardContext);
  const { boardId } = useParams();
const navigate= useNavigate();
  const selectedBoardIndex = parseInt(boardId, 10);

  const selectedBoard = boards[selectedBoardIndex];

  if (!selectedBoard) {
    return <div>Board not found.</div>;
  }

  const { name, color } = selectedBoard;
  return (
    <>
      <div className="post_nav">
        <div className="post_nav_left">
          <i className="fa-solid fa-arrow-left grey" onClick={navigate('/')}></i>
          <div className="post_nav_left_img center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M2oXreMxXifWakF_qE6WO0kYkm7Gcl1-uGsuXics0A&s"
              alt=""
            />
          </div>
          <div class="board_name center">
            <strong>{name}</strong>
          </div>
        </div>
        <div className="post_nav_right grey">
          <i className="fa-solid fa-search"></i> |
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
