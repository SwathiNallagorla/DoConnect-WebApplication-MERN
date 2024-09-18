import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionById, updateQuestion } from '../Services/Questions/questionService'; // Adjust the path as needed

function UpdateQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);

    const handleGoBack = () => {
        window.history.back();
      };
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getQuestionById(id);
                setQuestion(data);
            } catch (error) {
                console.log("Error fetching question:", error.message);
            }
        };

        fetchQuestion();
    }, [id]);

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            questiontext: question?.questiontext || "",
            description: question?.description || "",
            image: question?.image || '',
            category: question?.category || "",
        },

        validationSchema: Yup.object({
            questiontext: Yup.string().required("Question text is required"),
            description: Yup.string().required('Description is required'),
            image: Yup.string().url('Invalid URL format'),
            category: Yup.string().required("Category is required"),
        }),

        onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
            try {
                await updateQuestion(id, values);
                setStatus("success");
                resetForm();
                navigate(`/readquestion/${id}`);
            } catch (error) {
                setStatus("error");
                console.log("Error updating question:", error.message);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div style={{ 
            backgroundImage: 'url("https://images.pexels.com/photos/27294890/pexels-photo-27294890/free-photo-of-abstract-background-with-colorful-swirls.jpeg?auto=compress&cs=tinysrgb&w=400")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
            <div>
            <button
                    type="button"
                    className="btn btn-primary mb-4"
                    onClick={() => window.history.back()}>
                    Back
                </button>
                </div>
            <div className="card shadow-sm" style={{ width: '100%', maxWidth: '700px' }}>
            
                <div className="card-header text-center" style={{ padding: '10px 0' }}>
                    <h2>Update Question</h2>
                </div>
                <div className="card-body" style={{ padding: '15px' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='questiontext' className='form-label'>Question Text</label>
                            <input
                                id="questiontext"
                                name="questiontext"
                                type="text"
                                className={`form-control ${formik.touched.questiontext && formik.errors.questiontext ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.questiontext}
                                data-testid="questiontext"
                            />
                            {formik.touched.questiontext && formik.errors.questiontext && (
                                <div className='invalid-feedback'>{formik.errors.questiontext}</div>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='image' className='form-label'>Image URL</label>
                            <input
                                id="image"
                                name="image"
                                type="text" 
                                className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.image}
                                data-testid="image"
                            />
                            {formik.touched.image && formik.errors.image && (
                                <div className='invalid-feedback'>{formik.errors.image}</div>
                            )}
                            {formik.values.image && (
                                <div className='mt-3'>
                                    <img src={formik.values.image} alt="Preview" className="img-fluid rounded shadow-sm" style={{ maxHeight: '30px' }} />
                                </div>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="2"
                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                data-testid="description"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <div className='invalid-feedback'>{formik.errors.description}</div>
                            )}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='category' className='form-label'>Category</label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                className={`form-control ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.category}
                                data-testid="category"
                            />
                            {formik.touched.category && formik.errors.category && (
                                <div className='invalid-feedback'>{formik.errors.category}</div>
                            )}
                        </div>

                        <button type='submit' className='btn btn-primary w-100' disabled={formik.isSubmitting}>
                            Update
                        </button>

                        {formik.status && formik.status === 'success' && (
                            <div className='alert alert-success mt-3' data-testid='response'>
                                Question updated successfully!
                            </div>
                        )}

                        {formik.status && formik.status === 'error' && (
                            <div className='alert alert-danger mt-3' data-testid='response'>
                                There was an error updating the question.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateQuestion;
