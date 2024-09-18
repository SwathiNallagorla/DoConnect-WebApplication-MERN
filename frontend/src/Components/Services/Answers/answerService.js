// src/services/answerService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/answers'; // Base URL for answers
const COMMENT_URL = 'http://localhost:5000/comments'; // Base URL for comments
const ANSWER_URL = 'http://localhost:5000/answers';

const getAnswerDetails = async (id, token) => {
  const response = await axios.get(`${API_URL}/id/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const likeAnswer = async (id, token) => {
  await axios.put(`${API_URL}/like/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const unlikeAnswer = async (id, token) => {
  await axios.put(`${API_URL}/dislike/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const fetchComments = async (id, token) => {
  const response = await axios.get(`${COMMENT_URL}/answer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const addComment = async (id, comment, token) => {
  await axios.post(`${COMMENT_URL}/comment/${id}`, { comment }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// Add a new answer to a specific question
const addAnswer = async (qid, answerData, token) => {
  const response = await axios.post(`${ANSWER_URL}/${qid}`, answerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export {
  getAnswerDetails,
  likeAnswer,
  unlikeAnswer,
  fetchComments,
  addComment,
  addAnswer,
};
