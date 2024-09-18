import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestionsByText, fetchQuestionsByCategory } from '../Services/Questions/questionService'; // Import the service functions

function QuestionList() {
    const { text, category } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError(null);
            try {
                let data;
                if (text) {
                    // Fetch questions by text
                    data = await fetchQuestionsByText(text);
                } else if (category) {
                    // Fetch questions by category
                    data = await fetchQuestionsByCategory(category);
                }

                setQuestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [text, category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Questions</h2>
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question) => (
                        <li key={question._id}>
                            <h3>{question.questiontext}</h3>
                            <p>Category: {question.category}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions found</p>
            )}
        </div>
    );
}

export default QuestionList;
