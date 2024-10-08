import React, { useContext } from "react";
import { BoardContext } from "../Context/BoardProvider";

const Overlay = ({
  setShowOverlay,
  setBoardName,
  setPostColor,
  showOverlay,
  boardName,
  postColor,


}) => {
  return (
    <div className="overlay">
      <div className="overlay_content">
        <h3>Add a name for your board</h3>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name"
        />
        <select
          value={postColor}
          onChange={(e) => setPostColor(e.target.value)}
          placeholder="Select post color"
        >
          <option value="">Select color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        <button onClick={() => setShowOverlay(false)}>Create</button>
        <button onClick={() => setShowOverlay(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Overlay;
