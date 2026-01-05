import { useState } from "react";
import blogServices from "../services/blogs";
const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  // const likeHandler = async (e, id) => {
  //   e.preventDefault();
  //   const updatedLikes = likes + 1;
  //   setLikes(updatedLikes);

  //   try {
  //     const blogid = id;
  //     const response = {
  //       ...blog,
  //       likes: updatedLikes,
  //     };
  //     await blogServices.like(blogid, response);
  //   } catch (error) {
  //     setLikes(likes);
  //     console.error("Failed to like blog", error);
  //   }
  // };
  const handleDelete = (e) => {
    e.preventDefault();
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
  };

  const likeHandler = async (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    if (!user) {
      alert("You must be logged in to like posts!");
      return;
    }
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      await blogServices.like(blog.id, updatedBlog);
    } catch (error) {
      console.error("Like failed, reverting UI", error);
      setLikes(likes);
    }
  };

  return (
    <>
      {!view && (
        <div style={blogStyle}>
          {blog.title + " "}
          <button
            onClick={() => {
              setView(!view);
            }}>
            View
          </button>
        </div>
      )}
      {view && (
        <div style={blogStyle}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}>
            <h3> {blog.title} </h3>
            <button
              onClick={() => {
                setView(!view);
              }}
              style={{ height: "30px" }}>
              hide
            </button>
          </div>
          <div> URL: {blog.url}</div>
          <div>
            Likes: {likes} <button onClick={likeHandler}>like</button>
          </div>
          <div>Author: {blog.author}</div>
          <div>
            <button
              style={{
                background: "#4286F6",
                border: "0px",
                borderRadius: "2px",
                marginBottom: "4px",
              }}
              onClick={handleDelete}>
              remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
