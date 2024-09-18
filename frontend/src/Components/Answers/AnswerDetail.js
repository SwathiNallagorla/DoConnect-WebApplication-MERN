import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AnswerDetail() {
  const { id } = useParams();
  const [answer, setAnswer] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');

  const fetchAnswerDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/answers/id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswer(response.data);
      setLikes(response.data.likes.length);
    } catch (error) {
      console.error('Error fetching answer details', error);
    }
  }, [id, token]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchAnswerDetails();
    fetchComments();
  }, [fetchAnswerDetails, fetchComments]);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/answers/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(prevLikes => prevLikes + 1);
    } catch (error) {
      console.error('Error liking the answer', error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.put(`http://localhost:5000/answers/dislike/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(prevLikes => prevLikes - 1);
    } catch (error) {
      console.error('Error unliking the answer', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:5000/comments/comment/${id}`, { comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments(); // Refresh the comments after adding a new one
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <div>
      {answer && (
        <div>
          <h2>{answer.answertext}</h2>
          <p>Likes: {likes}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleUnlike}>Unlike</button>

          <h3>Comments</h3>
          <ul>
            {comments.map(c => (
              <li key={c._id}>{c.comment}</li>
            ))}
          </ul>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
}

export default AnswerDetail;
