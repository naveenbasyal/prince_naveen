import React, { createContext, useState } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("#ddd");
  const [showOverlay, setShowOverlay] = useState(false);
  const [colors, setColors] = useState([
    "#d2faff",
    "#dbdbff",
    "#ffc9d5",
    "#ffe3ac",
  ]);
  
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);


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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
