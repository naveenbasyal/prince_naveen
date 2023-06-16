import React, { useState, useContext } from "react";
import { BoardContext, BoardProvider } from "../Context/BoardProvider";

import "../styles/Board_Nav.css";
const Board_Nav = ({
  handleCreateBoardClick,
  postColor,
}) => {
  

  return (
    <div className="board_nav">
      <div className="board_nav_left">
        <div className="board_nav_left_img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M2oXreMxXifWakF_qE6WO0kYkm7Gcl1-uGsuXics0A&s"
            alt=""
          />
        </div>
        <span className="board_nav_left_title">toddle</span>
      </div>
      <div className="board_nav_right">
        <div className="board_nav__search">
          <div className="board_nav__search_icon">
            <i className="fa-solid fa-search"></i>
          </div>
          <input type="text" />
          {postColor}
        </div>
        <div className="create_board">
          <button
            className="create_board__btn"
            onClick={handleCreateBoardClick}
          >
            <i className="fa-solid fa-plus "></i> Create new board
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board_Nav;
