import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './Components/Pages/Menu';
import Footer from './Components/Pages/Footer';
import { lazy, Suspense } from 'react';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import CreateAnswer from './Components/Answers/CreateAnswer'; 
import AnswerDetail from './Components/Answers/AnswerDetail';
import CommentList from './Components/Answers/CommentList';
import AnswerList from './Components/Answers/AnswerList';
import AllUsers from './Components/Users/AllUsers';
import QuestionList from './Components/Questions/QuestionList';
import NotificationList from './Components/Notifications/NotificationList';

const Home = lazy(() => import('./Components/Pages/Home'));
const CreateQuestion = lazy(() => import('./Components/Questions/CreateQuestion'));
const UpdateQuestion = lazy(() => import('./Components/Questions/UpdateQuestion'));
const ListQuestionsByCategory = lazy(() => import('./Components/Questions/ListQuestionsByCategory'));
const ReadQuestion = lazy(() => import('./Components/Questions/ReadQuestion'));
const ListAllQuestions = lazy(() => import('./Components/Questions/ListAllQuestions'));
const AdminQuestions = lazy(() => import('./Components/Questions/AdminQuestions'));
 //const AnswerList = lazy(() => import('./Components/Answers/AnswerList'));
 const ViewApprovedQues = lazy(() => import('./Components/Answers/ViewApprovedQues'));


function App() {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return <Navigate to='/login' />;
    }

    return children;
  }

  return (
    <div className="App">
      <Menu />
      <Suspense fallback={
        <div className='container'>
          <div className="d-flex align-items-center" style={{ "marginTop": 100 }}>
            <strong role="status">Loading...</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createquestion" element={<ProtectedRoute><CreateQuestion /></ProtectedRoute>} />
          <Route path="/updatequestion/:id" element={<ProtectedRoute><UpdateQuestion /></ProtectedRoute>} />
          <Route path="/listquestions/:category" element={<ListQuestionsByCategory />} />
          <Route path="/readquestion/:id" element={<ReadQuestion />} />
          <Route path='/listallquestions' element={<ListAllQuestions />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/adminquestions' element={<ProtectedRoute><AdminQuestions /></ProtectedRoute>} />
          <Route path="/createanswer/:qid" element={<CreateAnswer />} />
          <Route path="/answers/:id" element={<ProtectedRoute><AnswerDetail /></ProtectedRoute>} />
          {/* <Route path="/answerlist/:qid" element={<ProtectedRoute><AnswerList isApproved={true} questionId={':qid'} /></ProtectedRoute>} /> */}
          <Route path="/answerlist/:qid" element={<ProtectedRoute><AnswerList isApproved={false} questionId={':qid'} /></ProtectedRoute>} />
          <Route path="/answerlist/:qid/:isUser" element={<ProtectedRoute><AnswerList isApproved={false} isuser= {':isUser'} questionId={':qid'} /></ProtectedRoute>} />
          <Route path="/answers/qid/:qid" element={<ProtectedRoute><AnswerList isApproved={false} questionId={':qid'} /></ProtectedRoute>} />
          <Route path="/questions/questiontext/:text" element={<QuestionList />} />
          <Route path="/questions/category/:category" element={<QuestionList  />} />
          <Route path='/viewapprovedques/:isAdmin' element={<ViewApprovedQues isAdmin={':isAdmin'} />} />

          <Route path="/comments/answer/:ansid" element={<ProtectedRoute><CommentList /></ProtectedRoute>} />
          <Route path='/userProfiles' element={<AllUsers />} />

          <Route path="/notifications" element={<NotificationList />} />

        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
