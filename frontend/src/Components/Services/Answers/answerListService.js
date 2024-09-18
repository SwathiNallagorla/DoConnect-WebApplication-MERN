import axios from 'axios';

const API_URL = 'http://localhost:5000/answers';
const COMMENT_API_URL = 'http://localhost:5000/comments';

const getToken = () => localStorage.getItem('token');

export const fetchAnswers = async (questionId, userType) => {
    if (!questionId) {
        throw new Error("Question ID is required.");
    }

    const endpoint = userType === "user"
        ? `${API_URL}/approved/${questionId}`
        : `${API_URL}/qid/${questionId}`;

    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data.map(answer => ({
        ...answer,
        likeCount: 0,
    }));
};

export const fetchAnswerLikeCount = async (answerId) => {
    const endpoint = `${API_URL}/likescount/${answerId}`;
    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data.message;
};

export const likeAnswer = async (answerId) => {
    const endpoint = `${API_URL}/like/${answerId}`;
    await axios.put(endpoint, { username: localStorage.getItem('email') }, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    
};

export const dislikeAnswer = async (answerId) => {
    const endpoint = `${API_URL}/dislike/${answerId}`;
    await axios.put(endpoint, { username: localStorage.getItem('email') }, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const fetchAllComments = async (answerId) => {
    const endpoint = `${COMMENT_API_URL}/answer/${answerId}`;
    const response = await axios.get(endpoint, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return response.data;
};

export const addComment = async (answerId, commentText) => {
    const endpoint = `${COMMENT_API_URL}/comment/${answerId}`;
    await axios.post(endpoint, { comment: commentText }, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const approveAnswer = async (answerId, approvalCheck) => {
    const endpoint = approvalCheck
        ? `${API_URL}/unapprove/${answerId}`
        : `${API_URL}/approve/${answerId}`;
    
    await axios.put(endpoint, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const deleteAnswer = async (answerId) => {
    await axios.delete(`${API_URL}/${answerId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const deleteComment = async (commentId) => {
  await axios.delete(`${COMMENT_API_URL}/${commentId}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent in the header
      },
  });
};