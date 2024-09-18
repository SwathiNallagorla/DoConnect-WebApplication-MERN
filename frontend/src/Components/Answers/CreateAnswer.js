import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { addAnswer } from '../Services/Answers/answerService'; // Adjust the import path as needed
import { createNotification } from '../Services/notificationService'; // Import createNotification

const CreateAnswer = () => {
    const { qid } = useParams(); // Get the question ID from the route parameters
    const navigate = useNavigate(); // For navigation after submitting the answer
    const [statusMessage, setStatusMessage] = useState('');

    const handleGoBack = () => {
        window.history.back();
      };

    const formik = useFormik({
        initialValues: {
            answertext: '',
        },
        validationSchema: Yup.object({
            answertext: Yup.string().required('Answer text is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const token = localStorage.getItem('token'); // Get token from local storage
            try {
                const response = await addAnswer(qid, values, token); // Use the service function

                // Create notification for the new answer
                await createNotification({ message: `New answer added for question ID: ${qid}` }, token);

                setStatusMessage(response.message);
                formik.resetForm(); // Reset the form after submission
                navigate(`/readquestion/${qid}`); // Redirect to the question page
            } catch (error) {
                setStatusMessage(error.response?.data?.message || '');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mt-4">
             <button
                    type="button"
                    className="btn btn-primary mb-4"
                    onClick={() => window.history.back()}>
                    Back
                </button>



            <h2>Answer the Question</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="answertext" className="form-label">Your Answer</label>
                    <textarea
                        id="answertext"
                        name="answertext"
                        className={`form-control ${formik.touched.answertext && formik.errors.answertext ? 'is-invalid' : ''}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.answertext}
                        rows="4"
                    />
                    {formik.touched.answertext && formik.errors.answertext && (
                        <div className="text-danger">{formik.errors.answertext}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    Submit Answer
                </button>

                {statusMessage && (
                    <div className={formik.isSubmitting ? 'text-warning' : 'text-success'}>
                        {statusMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateAnswer;
