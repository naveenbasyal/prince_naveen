import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../Context/BoardProvider";
import "../styles/posts.css";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Posts = () => {
  const { boards } = useContext(BoardContext);
  const { boardId } = useParams();
  const inputRef = useRef(null);

  // ------- Actual array of post ------
  const [post, setPost] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const [newPost, setNewPost] = useState({
    img: "",
    title: "",
    content: "",
  });

  // -------- Search Functionaly --------
  const [searchQuery, setSearchQuery] = useState("");
  const searchFilteredPosts = post.filter((item) => {
    return (
      item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  useEffect(() => {
    console.log("Serach Post", searchFilteredPosts);
    document.title = name;
  }, [searchFilteredPosts]);

  // ------- Ovelays for new post ------
  const [postOverlay, setPostOverlay] = useState(false);
  const [editPostOverlay, setEditPostOverlay] = useState(false);
  const [editPost, setEditPost] = useState({
    img: "",
    title: "",
    content: "",
  });

  const [hoverPostIndex, setHoverPostIndex] = useState(null);

  const selectedBoard = boards.find((board) => board.id === boardId);

  useEffect(() => {
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    if (dbPosts.length > 0) {
      const filterPosts = dbPosts.filter((post) => {
        return post.boardId === boardId;
      });
      setPost(filterPosts);
    }
  }, [boardId]);

  const { name, color } = selectedBoard;

  // create post button
  const handleCreatePostClick = () => {
    setPostOverlay(true);
  };
  // --------- create a new post --------
  const handleCreatePost = () => {
    const createdPost = { ...newPost, boardId, postId: uuidv4() };
    setPost([...post, createdPost]);
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...dbPosts, createdPost]));
    setNewPost({
      id: "",
      img: "",
      title: "",
      content: "",
    });
    setPostOverlay(false);
  };

  // ------ Edit your post ------
  const handleEditPost = (id) => {
    setPost(
      post.map((post) => {
        if (post.postId === id) {
          return {
            ...post,
            img: editPost.img,
            title: editPost.title,
            content: editPost.content,
          };
        }
        return post;
      })
    );
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = dbPosts.map((post) => {
      if (post.postId === id) {
        return {
          ...post,
          img: editPost.img,
          title: editPost.title,
          content: editPost.content,
        };
      }
      return post;
    });
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setEditPostOverlay(false);
  };
  // -------------- Delete your post----------------
  const deletePost = (id) => {
    const updatedPosts = post.filter((post) => post.postId !== id);
    setPost(updatedPosts);
    const dbPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = dbPosts.filter((post) => {
      return post.postId !== id;
    });

    localStorage.setItem("posts", JSON.stringify(filteredPosts));
  };

  return (
    <>
      <div className="post_nav">
        
        <div className="post_nav_left">
          <Link to="/create">
            <i className="fa-solid fa-arrow-left grey fs-5"></i>
          </Link>

          <div className="post_nav_left_img center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M2oXreMxXifWakF_qE6WO0kYkm7Gcl1-uGsuXics0A&s"
              alt=""
            />
          </div>
          <div className="board_name center">
            <strong >{name}</strong>
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
                    onChange={(e) =>
                      setNewPost({ ...newPost, img: e.target.value })
                    }
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

        {/* Post Area */}
        {post.length === 0 ? (
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
          <div className="post_area row">
            {searchFilteredPosts.map((post, index) => (
              <div className="post col-lg-3 col-sm-12" key={index}>
                <div className="post_header d-flex align-items-center">
                  <div className="post_body_title">
                    <strong className="fs-5 ps-1">{post.title}</strong>
                  </div>
                  <div className="post_body_right d-flex">
                    <i className="fa-solid fa-bookmark me-2"></i>

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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTspvZboedMPZ9SHmJOM-0s1pxv1vT7HN5iMaHeNms&s"
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
                    <i className="fa-solid fa-heart me-2"></i>
                    <i className="fa-solid fa-share me-2"></i>
                  </div>
                </div>
              </div>
            ))}
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
      </div>
    </>
  );
};

export default Posts;
