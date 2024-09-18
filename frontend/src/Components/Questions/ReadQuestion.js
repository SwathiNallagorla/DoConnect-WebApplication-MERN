import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestionById } from '../Services/Questions/questionService'; // Adjust the import path as necessary
import './ReadQuestion.css'; // Import the CSS file

function ReadQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const token = localStorage.getItem('token'); // Get the token directly from local storage

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const data = await fetchQuestionById(id, token);
                setQuestion(data);
            } catch (error) {
                console.log('There was an error fetching the Questions data!', error);
            }
        };
        
        getQuestion();
    }, [id, token]);

    return (
        <div style={{ 
            backgroundImage: 'url("https://images.pexels.com/photos/27294890/pexels-photo-27294890/free-photo-of-abstract-background-with-colorful-swirls.jpeg?auto=compress&cs=tinysrgb&w=600")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '20px'
        }}>
            <div className="container" style={{ maxWidth: '800px', width: '100%' }}>
                <button
                    type="button"
                    className="btn btn-primary mb-4"
                    onClick={() => window.history.back()}>
                    Back
                </button>
                <div className="card shadow-sm mx-auto" style={{ width: '100%' }}>
                    {question ? (
                        <div className="card-body">
                            <div className="question-header">
                                <h5 className="card-title">Question No: {question._id}</h5>
                            </div>
                            <h1 className="question-text">Question: {question.questiontext}</h1>
                            {question.image && (
                                <img
                                    src={question.image}
                                    alt="Screenshot of doubt"
                                    className="img-fluid mb-3"
                                    style={{ maxWidth: '30%', height: '30%' }}
                                />
                            )}
                            <p className="card-text"><b>Description:</b> {question.description}</p>
                            <p className="card-text"><b>Status:</b> {question.status}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="loading">Loading...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReadQuestion;
