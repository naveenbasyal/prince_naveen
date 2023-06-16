import React, { createContext, useState } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boardName, setBoardName] = useState([]);
  const [postColor, setPostColor] = useState("black");
  const [showOverlay, setShowOverlay] = useState(false);
  const handleCreateBoardClick = () => {
    setShowOverlay(true);
    setPostColor("red");
    console.log(showOverlay);
    console.log("balck")
  };

  return (
    <BoardContext.Provider
      value={{
        boardName,
        setBoardName,
        postColor,
        setPostColor,
        showOverlay,
        handleCreateBoardClick,
        setShowOverlay,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
