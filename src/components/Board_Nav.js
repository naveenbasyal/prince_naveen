import React, { useState, useContext } from "react";


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
        <div className="board_nav__search d-flex align-items-center">
          <div className="board_nav__search_icon center">
            <i className="fa-solid fa-search"></i>
          </div>
          <input type="text" placeholder="Search..." className="search_input"/>
          
        </div>
        <div className="create_board">
          <button
            className="create_board__btn d-flex align-items-center py-3"
            onClick={handleCreateBoardClick}
          >
            <i className="fa-solid fa-plus me-1"></i> Create new board
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board_Nav;
