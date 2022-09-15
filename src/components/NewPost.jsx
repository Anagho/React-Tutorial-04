import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from '../api/posts'
import DataContext from "../context/DataContext";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  // Define id for the new post and check to see if the post array has a length, if it has a length, get the last post and add 1 to the id property, else start numbering id from 1.
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const datetime = format(new Date(), "MMMM dd, yyyy pp");
  const newPost = { id, title: postTitle, datetime, body: postBody };

  try {
    const response = await api.post("/posts", newPost);
    // create a new array with all posts
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};


  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
