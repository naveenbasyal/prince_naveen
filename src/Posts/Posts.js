import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../Context/BoardProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/posts.css";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

const Posts = () => {
  const { boards } = useContext(BoardContext);
  const { boardId } = useParams();
  const inputRef = useRef(null);

  // Actual array of posts
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const [newPost, setNewPost] = useState({
    img: "",
    title: "",
    content: "",
  });
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = posts.filter((item) => {
    return (
      item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const [hoverPostIndex, setHoverPostIndex] = useState(null);

  useEffect(() => {
    document.title = name;
  }, []);

  // Overlays for new post and edit post
  const [postOverlay, setPostOverlay] = useState(false);
  const [editPostOverlay, setEditPostOverlay] = useState(false);
  const [editPost, setEditPost] = useState({ img: "", title: "", content: "" });

  const selectedBoard = boards.find((board) => board.id === boardId);
  const { name, color } = selectedBoard;

  useEffect(() => {
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = dbPosts.filter((post) => post.boardId === boardId);
    setPosts(filteredPosts);
  }, [boardId]);

  // Create post button
  const handleCreatePostClick = () => {
    setPostOverlay(true);
  };

  // --------- create a new post --------
  const handleCreatePost = () => {
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

  // Edit a post
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

  // -------------- Delete your post----------------
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.postId !== id);
    setPosts(updatedPosts);
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = dbPosts.filter((post) => {
      return post.postId !== id;
    });

    localStorage.setItem("posts", JSON.stringify(filteredPosts));
  };

  // Drag and drop functionality
  const handleDragEnd = (result) => {
    console.log(result);
    const items = Array.from(posts);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setPosts(items);
    localStorage.setItem("posts", JSON.stringify(items));
  };

  // like post
  const handleLikePost = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.postId === id) {
          return { ...post, like: !post.like };
        }
        return post;
      })
    );
    console.log(posts);
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
  // ----Bookmark Post----
  const handleBookMarkPost = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.postId === id) {
          return { ...post, bookmark: !post.bookmark };
        }
        return post;
      })
    );
    console.log(posts);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewPost({ ...newPost, img: reader.result });
    };
    localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
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
          |<i className="fa-solid fa-bookmark"></i>
        </div>
      </div>

      <div className="main_post_area" style={{ background: `${color}` }}>
        <div className="post_header  d-flex ">
          <div className="fw-bold fs-4 pt-2 ">Your posts</div>
          <div className="post_create_btn">
            <button onClick={handleCreatePostClick}>
              {" "}
              <i className="fa-solid fa-plus me-2"></i>Create new post
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
              <p className="grey">
                create your first page by clicking on the '+' button above
              </p>
            </div>
          ) : (
            <Droppable droppableId="posts">
              {(provided) => (
                <div
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
                        <div
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
                                        // console.log(editPost);
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
                            <div className="post_header_img img-fluid">
                              <img
                                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTspvZboedMPZ9SHmJOM-0s1pxv1vT7HN5iMaHeNms&s"
                                src={post.img || `https://shorturl.at/botyD`}
                                alt=""
                              />
                            </div>
                            <div className="post_body">
                              <div className="post_body_content">
                                <p>{post.content}</p>
                              </div>
                            </div>
                            <div className="post_footer">
                              <div className="post_footer_left">
                                <i
                                  title={`${
                                    post.like ? "Unlike Post" : "Like Post"
                                  }`}
                                  className={`fa-heart me-2 ${
                                    post.like ? "fas text-danger" : "far"
                                  }`}
                                  onClick={() => {
                                    handleLikePost(post.postId);
                                  }}
                                ></i>
                                <span className="like_count">
                                  {post.like ? 1 : 0}
                                </span>
                                <i className="fa-solid fa-share mx-3"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
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
                  onClick={() => setPostOverlay(false)}
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
              <label htmlFor="postImage" className="u-f-b">
                <i className="fa-solid fa-image me-2"></i>
                Add your image
                <input
                  type="file"
                  name="postImage"
                  id="postImage"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {/* post content */}
            <div className="post_content">
              <div className="mt-5 fw-bold mb-3">What's on your mind?</div>
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
