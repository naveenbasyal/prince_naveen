import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../Context/BoardProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/posts.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
const Posts = () => {
  const {
    boards,
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
    setLikedPosts,
  } = useContext(BoardContext);

  // Getting the boardId from the url
  const { boardId } = useParams();
  const inputRef = useRef(null);
  const sw = window.screen.width;

  const [showBookMarkPosts, setShowBookMarkPosts] = useState(false);
  const [showLikedPosts, setShowLikedPosts] = useState(false);

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [loading , setLoading] = useState(false);
  const filteredPosts = showLikedPosts
    ? likedPosts
    : showBookMarkPosts
    ? bookMarkPosts
    : posts.filter((item) => {
        return (
          item.title &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  const selectedBoard = boards.find((board) => board.id === boardId);

  const { name, color } = selectedBoard; // destructuring the selected board
  useEffect(() => {
    document.title = name;
  }, []);

  useEffect(() => {
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = dbPosts.filter((post) => post.boardId === boardId);
    setPosts(filteredPosts);
  }, [boardId]);

  // ------- Create post button --------
  const handleCreatePostClick = () => {
    setPostOverlay(true);
  };

  // --------- Create a new post --------
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error("Please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      return;
    }

    const createdPost = { ...newPost, boardId, postId: uuidv4() };
    setPosts([...posts, createdPost]);
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...dbPosts, createdPost]));
    setNewPost({
      img: "",
      title: "",
      content: "",
    });
    setPostOverlay(false);
  };

  // --------- Edit a post --------------
  const handleEditPost = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.postId === id) {
          return { ...post, ...editPost };
        }
        return post;
      })
    );
    localStorage.setItem(
      "posts",
      JSON.stringify(
        posts.map((post) => {
          if (post.postId === id) {
            return { ...post, ...editPost };
          }
          return post;
        })
      )
    );
    setEditPostOverlay(false);
  };

  // -------- Delete your post ------------
  const deletePost = (id) => {

    const updatedPosts = posts.filter((post) => post.postId !== id);
    setPosts(updatedPosts); 
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = dbPosts.filter((post) => {
      return post.postId !== id;
    });
  
    localStorage.setItem("posts", JSON.stringify(filteredPosts)); 
  };
  

  // -------- Drag and drop functionality ---------
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPosts(items);
    localStorage.setItem("posts", JSON.stringify(items));
  };

  const handleLikePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postId === id) {
          return { ...post, like: !post.like };
        }
        return post;
      })
    );

    localStorage.setItem(
      "posts",
      JSON.stringify(
        posts.map((post) => {
          if (post.postId === id) {
            return { ...post, like: !post.like };
          }
          return post;
        })
      )
    );
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handleBookMarkPost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.postId === id) {
          return { ...post, bookmark: !post.bookmark };
        }
        return post;
      })
    );
  
    localStorage.setItem(
      "posts",
      JSON.stringify(
        posts.map((post) => {
          if (post.postId === id) {
            return { ...post, bookmark: !post.bookmark };
          }
          return post;
        })
      )
    );
  };


  const uploadImage = async(file)=>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','digitalwall');
    formData.append('cloud_name','dtmwcbui1');
      setLoading(true);
    const res = await fetch('https://api.cloudinary.com/v1_1/dtmwcbui1/image/upload',{
      method:'POST',
      body:formData
    })
      
    const data = await res.json();
    console.log(data);
    return data.url;
    
  }
  // ---------------Add Image ------------
  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if (!file) toast.error("Please select an image", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return toast.error("Format is not supported", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      })
    }
    if (file.size > 5000000) {
      return toast.error("Size must be less than 5MB", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      })

    }
    
    const imageUrl = await uploadImage(file);
    setNewPost({ ...newPost, img: imageUrl });

    
  };

  return (
    <>
      <ToastContainer />
      <div className="post_nav">
        <div className="post_nav_left">
          <Link to="/">
            <i className="fa-solid fa-arrow-left grey fs-5"></i>
          </Link>

          <div className="post_nav_left_img center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M2oXreMxXifWakF_qE6WO0kYkm7Gcl1-uGsuXics0A&s"
              alt=""
            />
          </div>
          <div className="board_name center">
            <strong>{name}</strong>
          </div>
        </div>
        <div className="post_nav_right grey">
          <div className="board_nav__search d-flex align-items-center">
            <div className="board_nav__search_icon center">
              <i className="fa-solid fa-search"></i>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="search_input ps-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>{" "}
          <i
            title="Show Liked posts"
            className={`fa-heart me-2 ${showLikedPosts ? `fas red` : "far"}`}
            onClick={() => {
              if (posts.length === 0) {
                toast.error("No posts to show", {
                  position: "top-center",
                });
                return;
              }
              setShowLikedPosts(!showLikedPosts);
              setShowBookMarkPosts(false);
              setLikedPosts(posts.filter((post) => post.like === true));
            }}
          ></i>
          |
          <i
            title="Show Bookmark posts"
            className={`fa-bookmark me-2 ${
              showBookMarkPosts ? `fas red` : "far"
            }`}
            onClick={() => {
              if (posts.length === 0) {
                toast.error("No posts to show", {
                  position: "top-center",
                });
                return;
              }
              setShowLikedPosts(false);
              setShowBookMarkPosts(!showBookMarkPosts);
              setBookMarkPosts(posts.filter((post) => post.bookmark === true));
            }}
          ></i>
        </div>
      </div>

      <div className="main_post_area" style={{ background: `${color}` }}>
        <div className="post_header  d-flex ">
          <div className="fw-bold fs-4 pt-2  mx-5">Your posts</div>
          <div className="post_create_btn">
            <button onClick={handleCreatePostClick}>
              <i className="fa-solid fa-plus me-2"></i>
              {sw > 500 ? "Create new post" : ""}
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {posts.length === 0 ? (
            <div className="center mt-5">
              <div className="img-fluid mt-5">
                <img src="/images/NoPostMobile.png" alt="No post image " />
              </div>
              <strong> Nothing here yet</strong>
              <p className="grey center">
                create your first page by clicking on the '+' button above
              </p>
            </div>
          ) : (
            <Droppable droppableId="posts">
              {(provided) => (
                <ul
                  className="posts row"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredPosts.map((post, index) => (
                    <Draggable
                      key={post.postId}
                      draggableId={post.postId}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          key={post.postId}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="col-lg-3 col-sm-12 post"
                          onMouseEnter={() => setHoverPostIndex(null)}
                        >
                          <div className="" key={index}>
                            <div className="post_header d-flex align-items-center">
                              <div className="post_body_title">
                                <strong
                                  className="fs-5 ps-1"
                                  title={post.title}
                                >
                                  {post.title}
                                </strong>
                              </div>
                              <div className="post_body_right d-flex">
                                <i
                                  title="Bookmark post"
                                  className={`fa-bookmark me-2 ${
                                    post.bookmark ? `fas text-primary` : "far"
                                  }`}
                                  onClick={() => {
                                    handleBookMarkPost(post.postId);
                                  }}
                                ></i>

                                <i
                                  className="fa-solid fa-ellipsis-h"
                                  onMouseEnter={() => setHoverPostIndex(index)}
                                ></i>
                                {hoverPostIndex === index && (
                                  <div
                                    className="post_options__model"
                                    onMouseLeave={() => setHoverPostIndex(null)}
                                  >
                                    <button
                                      onClick={() => {
                                        setEditPost({ ...post });
                                        setEditPostOverlay(true);
                                      }}
                                      className="edit_board d-flex align-items-center"
                                    >
                                      <i className="fa-solid fa-pencil me-2"></i>
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => deletePost(post.postId)}
                                      className="delete_board d-flex align-items-center text-danger"
                                    >
                                      <i className="fa-solid fa-trash me-2"></i>
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            {/*  ---------------Post Image------------- */}
                            {post.img && (
                              <div className="post_header_img img-fluid">
                                <img
                                  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTspvZboedMPZ9SHmJOM-0s1pxv1vT7HN5iMaHeNms&s"
                                  src={post.img}
                                  alt=""
                                />
                              </div>
                            )}

                            <div className="post_body mt-3">
                              <div className="post_body_content">
                                <p>{post.content}</p>
                              </div>
                              <hr />
                            </div>
                            <div className="post_footer">
                              <div className="post_footer_left">
                                <i
                                  title={`${
                                    post.like ? "Unlike Post" : "Like Post"
                                  }`}
                                  className={`pointer fa-heart mx-2 ${
                                    post.like ? "fas text-danger" : "far"
                                  }`}
                                  onClick={() => {
                                    handleLikePost(post.postId);
                                  }}
                                ></i>

                                <i className="fa-solid fa-share mx-3"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </DragDropContext>
      </div>
      {/* Post Overlay */}
      {postOverlay && (
        <div className="postOverlay">
          <div className="postOverlay_content">
            <div className="d-flex align-items-center position-relative mb-4">
              <div className="post_overlay_title ">
                <div>
                  <strong className="fs-5">Create a post </strong>
                  <p className="grey">write something for your post</p>
                </div>
                <i
                  className="fa-solid fa-times"
                  onClick={() => {
                    setPostOverlay(false);
                    newPost.img && setNewPost({ ...newPost, img: "" });
                  }}
                ></i>
              </div>
            </div>
            <div className="subject">
              <label htmlFor="postTitle" className="my-1">
                Subject
              </label>
              <input
                ref={inputRef}
                type="text"
                name="postTitle"
                className="board_input"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Enter subject here"
              />
            </div>
            {/* post Image */}
            <div className="post_image">
              {newPost.img ? (
                <div className="text-success mx-2 fw-bold">
                  <i className="fa-solid fa-image me-2"></i>
                  Image added succesfully{" "}
                  <i className="fas fa-octagon fa-beat fa-sm"></i>
                </div>
              ) : (
                <label htmlFor="postImage" className="u-f-b">
                  Add your Image
                  <input
                    type="file"
                    name="postImage"
                    id="postImage"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            {/* post content */}
            <div className="post_content">
              <div className="mt-4 fw-bold mb-3">What's on your mind?</div>
              <textarea
                name="postContent"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                placeholder="Type here"
              ></textarea>
            </div>

            {/*  create post button */}
            <div className="position-relative">
              <button
                onClick={handleCreatePost}
                className="postOverlay_create_btn"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Post Overlay */}
      {editPostOverlay && (
        <div className="postOverlay">
          <div className="postOverlay_content">
            <div className="d-flex align-items-center position-relative mb-4">
              <div className="post_overlay_title ">
                <div>
                  <strong className="fs-5">Edit your Post </strong>
                  <p className="grey">
                    you can edit the subject, image and content
                  </p>
                </div>
                <i
                  className="fa-solid fa-times"
                  onClick={() => setEditPostOverlay(false)}
                ></i>
              </div>
            </div>
            <div className="subject">
              <label htmlFor="postTitle" className="my-1">
                Subject
              </label>
              <input
                ref={inputRef}
                type="text"
                name="postTitle"
                className="board_input"
                value={editPost.title}
                onChange={(e) =>
                  setEditPost({ ...editPost, title: e.target.value })
                }
                placeholder="Enter subject here"
              />
            </div>
            {/* post Image */}
            <div className="post_image">
              <label htmlFor="postImage" className="u-f-b">
                <i className="fa-solid fa-image me-2"></i>
                Add your image
                <input
                  type="file"
                  name="postImage"
                  id="postImage"
                  onChange={(e) =>
                    setEditPost({ ...editPost, img: e.target.value })
                  }
                />
              </label>
            </div>
            {/* post content */}
            <div className="post_content">
              <div className="mt-5 fw-bold mb-3">What's on your mind?</div>
              <textarea
                name="postContent"
                value={editPost.content}
                onChange={(e) =>
                  setEditPost({ ...editPost, content: e.target.value })
                }
                placeholder="Type here"
              ></textarea>
            </div>

            {/*  edit post button */}
            <div className="position-relative">
              <button
                onClick={() => handleEditPost(editPost.postId)}
                className="postOverlay_create_btn"
              >
                Edit Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
