import React, { createContext, useState } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("boards")) || []
  );
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [colors, setColors] = useState([
    "#d2faff",
    "#dbdbff",
    "#ffc9d5",
    "#ffe3ac",
  ]);

  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  // ------- Search Functionality -------
  const [searchQuery, setSearchQuery] = useState(""); // storing the user's query

  const searchFilteredBoards = boards.filter((board) => {
    return (
      board.name && board.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  

  return (
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        newBoardName,
        setNewBoardName,
        newBoardColor,
        setNewBoardColor,
        showOverlay,
        setShowOverlay,
        colors,
        setColors,
        selectedBoardIndex,
        setSelectedBoardIndex,
        searchFilteredBoards, 
        searchQuery, 
        setSearchQuery, 
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
