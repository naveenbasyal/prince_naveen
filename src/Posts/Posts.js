import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../Context/BoardProvider";
import "../styles/posts.css";
import { useNavigate, Link } from "react-router-dom";

const Posts = () => {
  const { boards } = useContext(BoardContext);
  const { boardId } = useParams();

  const selectedBoard = boards.find((board) => board.id === boardId);

  const navigate = useNavigate();


  if (!selectedBoard) {
    return <div>Board not found.</div>;
  }

  const { name, color } = selectedBoard;
  return (
    <>
      <div className="post_nav">
        {console.log("heelo", color)}
        <div className="post_nav_left">
  <Link to="/">
            <i className="fa-solid fa-arrow-left grey"></i>
          </Link>


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
      <div className="main_post_area" style={{ background: `${color}` }}>
        <div className="post_header  d-flex ">
          <div className="fw-bold fs-4 pt-2 ">Your posts</div>
          <div className="post_create_btn">
            <button onClick={""}>
              {" "}
              <i className="fa-solid fa-plus me-2"></i>Create new post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
