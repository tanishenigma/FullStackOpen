import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setNewBlog }) => {
  const [createMessage, setCreateMessage] = useState("");

  const createBlog = async (e) => {
    e.preventDefault();
    const response = {
      title,
      author,
      url,
    };
    const createdBlog = await blogService.create(response);
    setNewBlog(createdBlog);
    setCreateMessage("A new blog " + response.title + " by " + response.author);
  };
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div>
      <p
        style={{
          color: "#027D02",
          background: "#D3D3D3",
          padding: "10px",
          border: "5px solid #027D02",
          borderRadius: "8px",
        }}>
        {createMessage}
      </p>
      <form onSubmit={createBlog}>
        <label>Titile:</label>
        <input
          type="text"
          name={title}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <label>Author:</label>
        <input
          type="text"
          name={author}
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <br />
        <label>Url:</label>
        <input
          name={url}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
