import React, { useContext } from "react";
import { BoardContext } from "../Context/BoardProvider";

const Overlay = () => {
  const { showOverlay } = useContext(BoardContext);
  return (
    <div className="overlay">
      <div className="overlay__content">
        <h1 className="overlay__title">Create a new board</h1>
        <input
          className="overlay__input"
          type="text"
          placeholder="Add board title"
        />
        {showOverlay && console.log("showOverlay")}
        <button className="overlay__button">Create</button>
        <button className="overlay__button">Cancel</button>
      </div>
    </div>
  );
};

export default Overlay;
