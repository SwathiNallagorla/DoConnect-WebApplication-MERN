// AdminQuestions.js

import React, { useState, useEffect } from 'react';
import {
    fetchAllQuestions,
    fetchUnapprovedQuestions,
    approveQuestion,
    resolveQuestion,
    deleteQuestion,
    searchQuestions,
    filterQuestionsByCategory,
    fetchAllApprovedQuestions
} from '../Services/Questions/questionService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAllQuestionsData();
    }, []);

    const fetchAllQuestionsData = async () => {
        try {
            const data = await fetchAllQuestions();
            setQuestions(data);
        } catch (error) {
            setMessage('Error fetching questions.');
        }
    };

    const handleApprove = async (id) => {
        try {
            const msg = await approveQuestion(id);
            setMessage(msg);
            fetchUnapprovedQuestionsData();
        } catch (error) {
            setMessage('Error approving question.');
        }
    };

    const handleResolve = async (id) => {
        try {
            const msg = await resolveQuestion(id);
            setMessage(msg);
            fetchUnapprovedQuestionsData();
        } catch (error) {
            setMessage('Error resolving question.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const msg = await deleteQuestion(id);
            setMessage(msg);
            fetchUnapprovedQuestionsData();
        } catch (error) {
            setMessage('Error deleting question.');
        }
    };

    const handleSearch = async () => {
        try {
            const data = await searchQuestions(searchText);
            setQuestions(data);
            if (!data.length) {
                setMessage('No questions found for the search term.');
            }
        } catch (error) {
            setMessage('Error searching questions.');
        }
    };

    const handleFilterByCategory = async () => {
        try {
            const data = await filterQuestionsByCategory(category);
            setQuestions(data);
            if (!data.length) {
                setMessage('No questions found for this category.');
            }
        } catch (error) {
            setMessage('Error filtering questions.');
        }
    };

    const fetchUnapprovedQuestionsData = async () => {
        try {
            const data = await fetchUnapprovedQuestions();
            setQuestions(data);
        } catch (error) {
            setMessage('Error fetching unapproved questions.');
        }
    };

    const fetchAllApprovedQuestionsData = async () => {
        try {
            const data = await fetchAllApprovedQuestions();
            setQuestions(data);
        } catch (error) {
            setMessage('Error fetching approved questions.');
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-image"
             style={{
                 backgroundImage: "url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=600')",
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
             }}>
            <div className="container mt-5">
                <h1 className="text-center mb-4 text-white">Admin Questions Management</h1>
                {message && <div className="alert alert-info">{message}</div>}

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

                <div className="d-flex justify-content-between mb-4">
                    <button className="btn btn-warning" onClick={fetchUnapprovedQuestionsData}>View Unapproved Questions</button>
                    <button className="btn btn-success" onClick={fetchAllApprovedQuestionsData}>View Approved Questions</button>
                </div>

                <div className="row">
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <div className="col-md-6 col-lg-6 mb-4" key={question._id}>
                                <div className="card h-100 shadow-sm" style={{ minHeight: '250px' }}>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title">Question: {question.questiontext}</h5>
                                        <p className="card-text"><strong>Status:</strong> {question.status}</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-success btn-sm w-100 mx-1" style={{ height: '40px' }} onClick={() => handleApprove(question._id)}>Approve</button>
                                            <button className="btn btn-info btn-sm w-100 mx-1" style={{ height: '40px' }} onClick={() => handleResolve(question._id)}>Resolve</button>
                                            <button className="btn btn-danger btn-sm w-100 mx-1" style={{ height: '40px' }} onClick={() => handleDelete(question._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-white">No questions found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminQuestions;
