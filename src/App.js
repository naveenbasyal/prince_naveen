import React from "react";
import Board from "./MyBoard/Board";
import { BoardProvider } from "./Context/BoardProvider";
import Posts from "./MyBoard/Posts/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <BoardProvider>
                <Board />
              </BoardProvider>
            }
          />
          <Route
            path="/board/:boardId"
            element={
              <BoardProvider>
                <Posts />
              </BoardProvider>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
