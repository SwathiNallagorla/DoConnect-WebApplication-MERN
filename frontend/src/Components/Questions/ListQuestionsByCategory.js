import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchQuestionsByCategory } from '../Services/Questions/questionService';
import './ListQuestionsByCategory.css';

function ListQuestionsByCategory() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem('token');

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    try {
      const data = await fetchQuestionsByCategory(category, token);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions by category', error);
    }
  };

  return (
    <div style={{
      backgroundImage: 'url("https://images.pexels.com/photos/27294890/pexels-photo-27294890/free-photo-of-abstract-background-with-colorful-swirls.jpeg?auto=compress&cs=tinysrgb&w=400")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      paddingTop: '56px',
      paddingBottom: '20px'
    }}>
      <div className="container my-5">
        <div className="d-flex justify-content-between mb-4">
          <button type="button" className="btn btn-primary" onClick={handleGoBack}>
            Back
          </button>
        </div>
        <h2 className="border-bottom pb-2 mb-4 text-center" style={{ fontWeight: 600, fontFamily: "monospace" }}>
          Questions
        </h2>
        <div className="row">
          {questions.map((question, index) => (
            <div className="col-md-6 mb-4" key={question._id}>
              <div className="card border-primary h-100 d-flex flex-column">
                <div className="card-header text-center bg-primary text-white">
                  <h5 className="mb-0">Question</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title" style={{ fontFamily: "monospace" }}>
                    {question.questiontext}
                  </h5>
                  <div className="d-flex justify-content-between mt-auto">
                    <button className="btn btn-secondary" onClick={() => navigate(`/readquestion/${question._id}`)}>
                      Description
                    </button>
                    <button className="btn btn-success" onClick={() => navigate(`/createanswer/${question._id}`)}>
                      Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListQuestionsByCategory;
