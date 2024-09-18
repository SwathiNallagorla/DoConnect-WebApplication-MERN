import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewUserQuestions() {
    const [approvedQuestions, setApprovedQuestions] = useState([]);
    const [unapprovedQuestions, setUnapprovedQuestions] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchQuestions();
    }, []);

    function fetchQuestions() {
        // Fetch approved questions
        axios.get(`http://localhost:5000/questions/approved/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setApprovedQuestions(response.data);
        })
        .catch(error => {
            console.log("Error occurred when fetching the approved questions", error);
        });

        // Fetch unapproved questions
        axios.get(`http://localhost:5000/questions/unapproved/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setUnapprovedQuestions(response.data);
        })
        .catch(error => {
            console.log("Error occurred when fetching the unapproved questions", error);
        });
    }

    function approveQuestion(questionId) {
        axios.put(`http://localhost:5000/questions/approve/${questionId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            fetchQuestions(); // Refresh the lists after approval
        })
        .catch(error => {
            console.error("Error occurred when approving the question", error);
        });
    }

    return (
        <div className="container my-4">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                Questions
            </h2>
            <div className="row">
                <h3 className="mb-3">Approved Questions</h3>
                {approvedQuestions.map(question => (
                    <div className="col-md-6 mb-4" key={question._id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                                    Question: {question.questiontext}
                                </h5>
                                <div className="d-flex justify-content-between mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/answerlist/${question._id}`, { state: { questionId: question._id } })}
                                        style={{ flex: 1, marginRight: '10px' }}
                                    >
                                        View Answers
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ViewUserQuestions;
