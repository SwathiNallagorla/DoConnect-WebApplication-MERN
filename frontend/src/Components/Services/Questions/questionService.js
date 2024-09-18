// services/questionService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/questions/';

const getToken = () => {
    return localStorage.getItem('token');
};

const fetchAllQuestions = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data || [];
};

const fetchUnapprovedQuestions = async () => {
    const response = await axios.get(`${API_URL}unapproved`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data || [];
};

const approveQuestion = async (id) => {
    const response = await axios.put(`${API_URL}approve/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data.message;
};

const resolveQuestion = async (id) => {
    const response = await axios.put(`${API_URL}resolve/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data.message;
};

const deleteQuestion = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data.message;
};

const searchQuestions = async (searchText) => {
    const response = await axios.get(`${API_URL}questiontext/${searchText}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data || [];
};

const filterQuestionsByCategory = async (category) => {
    const response = await axios.get(`${API_URL}category/${category}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data || [];
};

const fetchAllApprovedQuestions = async () => {
    const response = await axios.get(`${API_URL}approved`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data || [];
};

const createQuestion = async (data, token) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // return the response data
    } catch (error) {
        throw error; // throw the error for the calling function to handle
    }
};



// Fetch all approved questions for a user
const getApprovedUserQuestions = (token) => {
    return axios.get(`${API_URL}/approved/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const fetchQuestionsByCategory = async (category, token) => {
    try {
        const response = await axios.get(`${API_URL}/category/${category}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions by category', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

const fetchQuestionsByText = async (text) => {
    try {
        const response = await axios.get(`${API_URL}/questiontext/${text}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching questions by text', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

const fetchQuestionById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token if needed
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching question by ID:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const getQuestionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/id/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching question data: ' + error.message);
    }
};

export const updateQuestion = async (id, questionData) => {
    try {
        const response = await axios.put(`${API_URL}/updatequestion/${id}`, questionData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error updating question: ' + error.message);
    }
};

export const getApprovedQuestions = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/approved`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching approved questions:', error);
      throw error; // Propagate the error to handle it in the calling function
    }
  };

export {
    fetchAllQuestions,
    fetchUnapprovedQuestions,
    approveQuestion,
    resolveQuestion,
    deleteQuestion,
    searchQuestions,
    filterQuestionsByCategory,
    fetchAllApprovedQuestions,
    createQuestion,
    getApprovedUserQuestions,
    fetchQuestionsByCategory,
    fetchQuestionsByText,
    fetchQuestionById
};
