import React from "react";
import Board from "./MyBoard/Board";
import { BoardProvider } from "./Context/BoardProvider";
import Posts from "./Posts/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookMarks from "./BookMarks";
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
          <Route
          path="/bookmarks"
          element={
            <BoardProvider>
              <BookMarks/>
              </BoardProvider>
          }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
