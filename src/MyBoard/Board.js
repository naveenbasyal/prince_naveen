import React, { useContext, useEffect, useRef, useState } from "react";
import Board_Nav from "../components/Board_Nav";
import "../styles/Board.css";
import "../styles/overlay.css";
import { Link, useNavigate } from "react-router-dom";
import { BoardContext } from "../Context/BoardProvider";
import { v4 as uuidv4 } from "uuid";
const Board = () => {
  const {
    boards,
    setBoards,
    newBoardName,
    setNewBoardName,
    newBoardColor,
    setNewBoardColor,
    showOverlay,
    setShowOverlay,
    colors,
    selectedBoardIndex,
    setSelectedBoardIndex,
  } = useContext(BoardContext);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCreateBoardClick = () => {
    setShowOverlay(true);
  };

  useEffect(() => {
    if (showOverlay) {
      inputRef.current.focus();
    }
  }, [showOverlay]);

  const handleCreateBoard = () => {
    const newBoard = { name: newBoardName, color: newBoardColor, id: uuidv4() };
    if (!newBoardName) {
      alert("Please enter a board name");
      return;
    }

    setBoards([...boards, newBoard]);
    localStorage.setItem("boards", JSON.stringify([...boards, newBoard]));
    setShowOverlay(false);
    
    setNewBoardName("");
    setNewBoardColor("black");
    
  };

  const handleEllipsisClick = (e, index) => {
    e.stopPropagation(); // Prevent event propagation for the parent div (board)
    if (selectedBoardIndex === index) {
      setSelectedBoardIndex(null);
    } else {
      setSelectedBoardIndex(index);
    }
  };

  const handleEditBoard = (name) => {
    setNewBoardName(name);
    setShowOverlay(true);
  };

  const handleDeleteBoard = () => {
    const updatedBoards = boards.filter(
      (_, index) => index !== selectedBoardIndex
    );
    setBoards(updatedBoards);
    setSelectedBoardIndex(null);
  };
  const handleBoardClick = (index) => {
    const boardId = index.toString();
    navigate(`/board/${boardId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const optionsModel = document.querySelector(".options__model");
      if (optionsModel && !optionsModel.contains(event.target)) {
        setSelectedBoardIndex(null); // Close the options model if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    console.log(boards);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Board_Nav handleCreateBoardClick={handleCreateBoardClick} />

      <div className="container my-4">
        <h3 className="fw-bolder">My Boards</h3>
        <div className="row">
          {boards.length === 0 && (
            <div className="col-lg-3 col-sm-12 mx-3 d-flex my-5 fw-lighter">
              <strong> No boards to show</strong>
            </div>
          )}
          {boards.map((board, id) => (
            <div
              key={id}
              className="board col-lg-3 col-sm-12 mx-3 d-flex my-5 position-relative"
              onClick={()=>handleBoardClick(id)}
            >
              <div
                className="board__color "
                style={{ backgroundColor: board.color }}
                onClick={() => navigate(`/board/${board.id}`)}
              ></div>
              <div
                onClick={() => navigate(`/board/${board.id}`)}
                className="board__title d-flex align-items-center px-3 text-capitalize"
              >
                {board.name}
              </div>
              <div className="options position-absolute center">
                <i
                  className="fa-solid fa-ellipsis-v pointer dot"
                  onClick={(e) => handleEllipsisClick(e, id)}
                ></i>
                {selectedBoardIndex === id && (
                  <div className="options__model">
                    <button
                      onClick={() => handleEditBoard(board.name)}
                      className="edit_board d-flex align-items-center"
                    >
                      <i className="fa-solid fa-pencil me-2"></i>
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteBoard}
                      className="delete_board d-flex align-items-center text-danger"
                    >
                      <i className="fa-solid fa-trash me-2"></i>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showOverlay && (
          <div className="overlay">
            <div className="overlay_content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="overlay_title d-flex align-items-center m-0">
                  Add a name for your board
                </div>
                <i
                  className="fa-solid fa-times"
                  onClick={() => setShowOverlay(false)}
                ></i>
              </div>
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  className="board_input"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Enter board name"
                />
              </div>
              <div className="board_color">
                <strong>Select post colour</strong>
                <p>Here are some templates to help you get started</p>
                <div className="d-flex my-3">
                  {colors.map((color, id) => (
                    <div
                      key={id}
                      className={`board_color__item ${
                        color === newBoardColor ? "active" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewBoardColor(color)}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="position-relative">
                <button
                  onClick={handleCreateBoard}
                  className="overlay_create_btn"
                >
                  Create board
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Board;
