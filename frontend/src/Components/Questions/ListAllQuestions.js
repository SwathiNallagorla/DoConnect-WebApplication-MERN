import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getApprovedUserQuestions } from '../Services/Questions/questionService';

function ListAllQuestions() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchQuestions();
    }, []);

    function fetchQuestions() {
        getApprovedUserQuestions(token)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.log("Error occurred when fetching the questions", error);
            });
    }

    return (
        <div className="min-vh-100 bg-image"
             style={{
                 backgroundImage: "url('https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=600')",
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
             }}>
        <div className="container my-4">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace" }}>User Questions</h2>
            <div className="row">
                {questions.map(question => (
                    <div className="col-md-6 mb-4" key={question._id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title" style={{ fontWeight: 600, fontFamily: "monospace" }}>Question: {question.questiontext}</h5>
                                {token && (
                                    <div className="mt-auto d-flex justify-content-between mt-3">
                                        <button className="btn btn-primary" onClick={() => { navigate(`/readquestion/${question._id}`) }} style={{ flex: 1, marginRight: '10px' }}>Description</button>
                                        <button className="btn btn-warning" onClick={() => { navigate(`/updatequestion/${question._id}`) }} style={{ flex: 1 }}>Update</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default ListAllQuestions;
