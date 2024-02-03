// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000'; // Replace with your actual Django backend URL

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/blog/add_comment/`, {
        name: name,
        comment: comment,
      });

      // Append the new comment to the existing posts
      setPosts([...posts, response.data]);

      // Clear the comment and name fields
      setComment('');
      setName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Blog Comments System</h1>
      <section id="blog-section">
        <h2>Blog Posts</h2>
        <ul id="post-list">
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
      <section id="comment-section">
        <h2>Add a Comment</h2>
        <form id="comment-form" onSubmit={handleComment}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Comment</button>
        </form>
      </section>
    </div>
  );
};

export default App;
