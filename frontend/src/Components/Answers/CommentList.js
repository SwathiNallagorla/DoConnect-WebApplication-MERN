
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentList() {
  const { ansid } = useParams(); // Ensure `ansid` matches the parameter in the route
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // State to handle new comment input
  const token = localStorage.getItem('token');

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/comment/answer/${ansid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  }, [ansid, token]); // Include ansid and token as dependencies

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Only depend on fetchComments

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/comments/${ansid}`,
        { comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment(''); // Clear the input field after submission
      fetchComments(); // Refresh comments after submitting a new one
    } catch (error) {
      console.error('Error submitting comment', error);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: 'monospace' }}>
        Comments for Answer
      </h3>
      <ul className="list-group">
        {comments.map(comment => (
          <li key={comment._id} className="list-group-item">
            {comment.comment}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Comment
        </button>
      </form>
    </div>
  );
}

export default CommentList;