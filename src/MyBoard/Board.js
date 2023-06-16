import React, { useEffect, useRef, useState } from "react";
import Board_Nav from "../components/Board_Nav";
import "../styles/Board.css";
import "../styles/overlay.css";

const Board = () => {
  const [boards, setBoards] = useState([]); 
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("black"); 
  const [showOverlay, setShowOverlay] = useState(false);
  const [colors, setColors] = useState([
    "#A7F0F9",
    "#C5C5FC",
    "#FFAEC0",
    "#FFCC66",
  ]);
  const inputRef = useRef(null);

  const handleCreateBoardClick = () => {
    setShowOverlay(true);
  };

  useEffect(() => {
    if (showOverlay) {
      inputRef.current.focus();
    }
  }, [showOverlay]);

  const handleCreateBoard = () => {
    const newBoard = { name: newBoardName, color: newBoardColor };
    if (!newBoardName) {
      alert("Please enter a board name");
      return;
    }

    setBoards([...boards, newBoard]);
    setShowOverlay(false);
    setNewBoardName("");
    setNewBoardColor("black");
  };

  return (
    <>
      <Board_Nav handleCreateBoardClick={handleCreateBoardClick} />

      <div className="container my-4">
        <h3>My Boards</h3>
        <div className="row">
          {boards.length === 0 && (
            <div className="col-lg-3 col-sm-12 mx-3 d-flex my-5 fw-lighter">
              <strong> No boards to show</strong>
            </div>
          )}
          {boards.map((board, id) => (
            <div key={id} className="board col-lg-3 col-sm-12 mx-3 d-flex my-5 position-relative">
              <div
                className="board__color "
                style={{ backgroundColor: board.color }}
              ></div>
              <div className="board__title d-flex align-items-center px-3 text-capitalize">
                {board.name}
              </div>
              <div className="options position-absolute center">
                <i className="fa-solid fa-ellipsis-v"></i>

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
                      className="board_color__item"
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
