import axios from 'axios';

const COMMENT_URL = 'http://localhost:5000/comments';

// Fetch all comments for a specific answer
const fetchComments = async (ansid, token) => {
  const endpoint = `${COMMENT_URL}/comment/answer/${ansid}`;
  const response = await axios.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Add a new comment to a specific answer
const addComment = async (ansid, comment, token) => {
  const endpoint = `${COMMENT_URL}/${ansid}`;
  await axios.post(endpoint, { comment }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {
  fetchComments,
  addComment,
};
