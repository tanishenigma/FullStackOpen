import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const removeOnDelte = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [newBlog]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("UserLogged");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  if (user) {
    return (
      <>
        <h2>blogs</h2>
        <p>{user.username} logged in</p>
        <Logout />
        <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} />
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </>
    );
  } else if (!user && !showLogin) {
    return (
      <>
        <Login user={user} setUser={setUser} />
        <button onClick={() => setShowLogin(!showLogin)}>Cancel</button>
        <h3>Blogs</h3>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => setShowLogin(!showLogin)}>Login</button>
        <h3>Blogs</h3>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlog={removeOnDelte}
          />
        ))}
      </>
    );
  }
};

export default App;
