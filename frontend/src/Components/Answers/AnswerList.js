import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    fetchAnswers,
    fetchAnswerLikeCount,
    likeAnswer,
    dislikeAnswer,
    fetchAllComments,
    addComment,
    approveAnswer,
    deleteAnswer,
    deleteComment // Import deleteComment service function
} from '../Services/Answers/answerListService'; // Adjust the path if necessary

function AnswerList() {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCommentBox, setActiveCommentBox] = useState(null);
    const [commentTexts, setCommentTexts] = useState({});
    const [commentsByAnswer, setCommentsByAnswer] = useState({});

    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('user');
    const navigate = useNavigate();
    const location = useLocation();
    const { questionId } = location.state || {};

    const handleGoBack = () => {
        navigate(-1);
    };

    const loadAnswers = useCallback(async () => {
        if (!questionId) {
            navigate(-1); // If no questionId is found, go back
            return;
        }
        try {
            const fetchedAnswers = await fetchAnswers(questionId, userType);
            setAnswers(fetchedAnswers);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [questionId, userType, navigate]);

    const updateLikeCount = (answerId, likeCount) => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer =>
                answer._id === answerId ? { ...answer, likeCount } : answer
            )
        );
    };

    const handleLike = async (answerId) => {
        try {
            await likeAnswer(answerId);
            updateLikeCount(answerId, answers.find(answer => answer._id === answerId).likeCount + 1);
        } catch {
            setError("Failed to like the answer.");
        }
    };

    const handleDislike = async (answerId) => {
        try {
            await dislikeAnswer(answerId);
            updateLikeCount(answerId, answers.find(answer => answer._id === answerId).likeCount - 1);
        } catch {
            setError("Failed to dislike the answer.");
        }
    };

    const enableCommentArea = async (answerId) => {
        setActiveCommentBox(answerId);
        const comments = await fetchAllComments(answerId);
        setCommentsByAnswer(prev => ({
            ...prev,
            [answerId]: comments
        }));
    };

    const handleCommentText = (event, answerId) => {
        setCommentTexts(prevState => ({
            ...prevState,
            [answerId]: event.target.value,
        }));
    };

    const handleAddComment = async (answerId) => {
        try {
            setError(null); // Reset error state
            await addComment(answerId, commentTexts[answerId]);
            const comments = await fetchAllComments(answerId);
            setCommentsByAnswer(prev => ({
                ...prev,
                [answerId]: comments
            }));
            setCommentTexts(prevState => ({
                ...prevState,
                [answerId]: "",
            }));
        } catch {
            setError("Failed to add comment.");
        }
    };

    useEffect(() => {
        loadAnswers();
    }, [loadAnswers]);

    const handleApproveAnswer = async (answerId, approvalCheck) => {
        try {
            await approveAnswer(answerId, approvalCheck);
            loadAnswers();
        } catch {
            setError("Failed to approve the answer.");
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        try {
            await deleteAnswer(answerId);
            loadAnswers();
        } catch {
            setError("Failed to delete the answer.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId); // Call the deleteComment function
            const comments = await fetchAllComments(activeCommentBox);
            setCommentsByAnswer(prev => ({
                ...prev,
                [activeCommentBox]: comments
            }));
        } catch {
            setError("Failed to delete the comment.");
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
            <div className="container my-4">
                <div className="d-flex justify-content-between mb-4">
                    <button type="button" className="btn btn-primary" onClick={handleGoBack}>
                        Back
                    </button>
                </div>
                <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                    Answers List
                </h2>
                {loading && <p>Loading answers...</p>}
                {error && <p className="text-danger">{error}</p>}
                <div className="row">
                    {answers.map(answer => (
                        <div className="col-md-6 mb-4" key={answer._id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontWeight: 600, fontFamily: "monospace" }}>
                                        Answer: {answer.answertext}
                                    </h5>
                                    <div className="d-flex justify-content-between mt-3">
                                        {userType === "admin" ? (
                                            <div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleApproveAnswer(answer._id, answer.isapproved)}
                                                    style={{ flex: 1, marginRight: '10px' }}
                                                >
                                                    {answer.isapproved ? "UnApprove" : "Approve"}
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteAnswer(answer._id)}
                                                    style={{ flex: 1 }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleLike(answer._id)}
                                                    style={{ flex: 1, marginRight: '10px' }}
                                                >
                                                    Like ({answer.likeCount})
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleDislike(answer._id)}
                                                    style={{ flex: 1 }}
                                                >
                                                    Dislike
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            className="btn btn-link"
                                            onClick={() => enableCommentArea(answer._id)}
                                        >
                                            Show Comments
                                        </button>
                                        {activeCommentBox === answer._id && (
                                            <div className="mt-2">
                                                {commentsByAnswer[answer._id]?.map(comment => (
                                                    <div key={comment._id}>
                                                        <p>{comment.comment}</p>
                                                        {userType === "admin" && (
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteComment(comment._id)}
                                                            >
                                                                Delete Comment
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                {userType !== "admin" && (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={commentTexts[answer._id] || ''}
                                                            onChange={(e) => handleCommentText(e, answer._id)}
                                                            placeholder="Add a comment..."
                                                        />
                                                        <button onClick={() => handleAddComment(answer._id)}>Comment</button>
                                                    </>
                                                )}
                                            </div>
                                        )}
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

export default AnswerList;
