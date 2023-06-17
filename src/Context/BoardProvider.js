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

  // --------------------POST AREA --------------------

   // Actual array of posts
   const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const [newPost, setNewPost] = useState({
    img: "",
    title: "",
    content: "",
  });

  

  const [hoverPostIndex, setHoverPostIndex] = useState(null);

  // Overlays for new post and edit post
  const [postOverlay, setPostOverlay] = useState(false);
  const [editPostOverlay, setEditPostOverlay] = useState(false);
  const [editPost, setEditPost] = useState({ img: "", title: "", content: "" });

  // Show bookmarked posts
  const [bookMarkPosts, setBookMarkPosts] = useState([]);
  // Show Liked posts
  const [likedPosts, setLikedPosts] = useState([]);

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
        posts,
        setPosts,
        newPost,
        setNewPost,
        hoverPostIndex,
        setHoverPostIndex,
        postOverlay,
        setPostOverlay,
        editPostOverlay,
        setEditPostOverlay,
        editPost,
        setEditPost,
        bookMarkPosts,
        setBookMarkPosts,
          likedPosts,
          setLikedPosts
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, BoardContext };
