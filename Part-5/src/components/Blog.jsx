import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [view, setView] = useState(false);
  console.log(view);
  return (
    <>
      {!view && (
        <div style={blogStyle}>
          {blog.title + " "}{" "}
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
          <div>Author: {blog.author}</div>
          <div>
            Likes: {blog.likes} <button>like</button>
          </div>
          <div> URL: {blog.url}</div>
        </div>
      )}
    </>
  );
};

export default Blog;
