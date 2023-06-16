import React, { useContext, useEffect } from "react";
import Board_Nav from "../components/Board_Nav";
// import ov
import { BoardContext, BoardProvider } from "../Context/BoardProvider";
const Board = () => {
  const { showOverlay, postColor } = useContext(BoardContext);
  useEffect(() => {
    console.log("", postColor);
  }, [postColor]);
  return (
    <>
      <BoardProvider>
        <Board_Nav />
      </BoardProvider>
      {postColor}
      <div className="myboards">
        <h3>My Boards</h3>
      </div>
    </>
  );
};

export default Board;
