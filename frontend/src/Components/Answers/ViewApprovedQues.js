import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewApprovedQues({ isAdmin }) {
    const [approvedQuestions, setApprovedQuestions] = useState([]);
    const [unapprovedQuestions, setUnapprovedQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('user');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const approvedResponse = await axios.get(`http://localhost:5000/questions/approved/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setApprovedQuestions(approvedResponse.data || []);

            const unapprovedResponse = await axios.get(`http://localhost:5000/questions/unapproved/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUnapprovedQuestions(unapprovedResponse.data || []);
        } catch (error) {
            console.log("Error occurred when fetching the questions", error);
        }
    };

    const approveQuestion = async (questionId) => {
        try {
            await axios.put(`http://localhost:5000/questions/approve/${questionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchQuestions(); // Refresh the lists after approval
        } catch (error) {
            console.error("Error occurred when approving the question", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/questions/questiontext/${searchText}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setApprovedQuestions(response.data || []);
            if (!response.data.length) {
                console.log('No questions found for the search term.');
            }
        } catch (error) {
            console.error('Error searching questions:', error);
        }
    };

    const handleFilterByCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/questions/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setApprovedQuestions(response.data || []);
            if (!response.data.length) {
                console.log('No questions found for this category.');
            }
        } catch (error) {
            console.error('Error filtering questions:', error);
        }
    };

    return (
        <div className="min-vh-100 bg-image"
             style={{
                 backgroundImage: "url('https://images.pexels.com/photos/6606075/pexels-photo-6606075.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')",
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
             }}>
            <div className="container my-4">
                <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                    Questions
                </h2>

                <div className="mb-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filter by category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleFilterByCategory}>Filter</button>
                    </div>
                </div>

                <div className="row">
                    <h3 className="mb-3">Approved Questions</h3>
                    {approvedQuestions.map(question => (
                        <div className="col-md-6 mb-4" key={question._id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                                        Question: {question.questiontext}
                                    </h5>
                                    <div className="mt-auto">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={() => navigate(`/answerlist/${question._id}/${userType}`, { state: { questionId: question._id } })}
                                        >
                                            View Answers
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isAdmin === "admin" && (
                    <div className="row mt-4">
                        <h3 className="mb-3">Unapproved Questions</h3>
                        {unapprovedQuestions.map(question => (
                            <div className="col-md-6 mb-4" key={question._id}>
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                                            Question: {question.questiontext}
                                        </h5>
                                        <div className="mt-auto d-flex">
                                            <button
                                                className="btn btn-success me-2"
                                                onClick={() => approveQuestion(question._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => navigate(`/answerlist/${question._id}/${userType}`, { state: { questionId: question._id } })}
                                            >
                                                View Answers
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewApprovedQues;
