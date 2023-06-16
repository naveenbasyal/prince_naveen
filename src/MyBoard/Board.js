import React, { useContext, useEffect, useState } from "react";
import Board_Nav from "../components/Board_Nav";
// import ov
import { BoardContext, BoardProvider } from "../Context/BoardProvider";
import Overlay from "../components/Overlay";
const Board = () => {
  const [boardName, setBoardName] = useState([]);
  const [postColor, setPostColor] = useState("black");
  const [showOverlay, setShowOverlay] = useState(false);
  const handleCreateBoardClick = () => {
    setShowOverlay(prev=> !prev);
    setPostColor("red");
    console.log(showOverlay);
    console.log("balck");
  };
  return (
    <>
      <Board_Nav handleCreateBoardClick={handleCreateBoardClick} />
      {postColor}
      <div className="myboards">
        <h3>My Boards</h3>
        { showOverlay && <Overlay setBoardName={setBoardName} setShowOverlay={setShowOverlay} setPostColor={setPostColor} showOverlay={showOverlay} boardName={boardName} postColor={postColor}   />}
      </div>
    </>
  );
};

export default Board;
