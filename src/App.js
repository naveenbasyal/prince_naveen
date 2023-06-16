import React from "react";
import Board from "./MyBoard/Board";
import { BoardProvider } from "./Context/BoardProvider";
const App = () => {
  return (
    <>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </>
  );
};

export default App;
