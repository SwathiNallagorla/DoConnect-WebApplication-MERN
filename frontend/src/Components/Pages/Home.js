import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllApprovedQuestions } from '../Services/Questions/questionService'; // Adjust the path and function name
import Chat from './Chat';

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if there is no token
    } else {
      fetchCategories(token);
    }
  }, [navigate]);

  const fetchCategories = async (token) => {
    try {
      const questions = await fetchAllApprovedQuestions(token);

      const uniqueCategories = [
        ...new Set(questions.map((question) => question.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories', error);
      // Redirect to login if the token is invalid or an error occurs
      navigate('/login');
    }
  };

  return (
    <div style={{
      backgroundImage: 'url("https://images.pexels.com/photos/628281/pexels-photo-628281.jpeg?auto=compress&cs=tinysrgb&w=600")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      color: '#fff',
    }}>
      <header style={{
        position: 'relative',
        padding: '20px 0',
        background: 'rgba(255, 229, 204, 0.7)',
        color: '#000',
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
      }}>
        <i><h1>Welcome to DoConnect!</h1></i>
        <i><p>Your platform for learning and sharing knowledge</p></i>
      </header>

      <div className="container my-5">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category}>
              <div className="card" onClick={() => navigate(`/listquestions/${category}`)} style={{ cursor: 'pointer', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}>
                <div className="card-body" style={{ background: '#fff', color: '#333' }}>
                  <h5 className="card-title" style={{
                    background: 'linear-gradient(90deg, rgba(153, 51, 204, 1) 0%, rgba(255, 102, 204, 1) 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '15px 0',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}>
                    {category}
                  </h5>
                  <p className="card-text" style={{ textAlign: 'center' }}>Explore questions related to {category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Chat />
    </div>
  );
}

export default Home;
