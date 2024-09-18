import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/Users/userService"; // Import the loginUser function

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            role: 'user'
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const data = await loginUser(values); // Use the loginUser function

                if (!data || !data.token) {
                    alert("Enter valid credentials");
                } else {
                    const token = data.token;
                    console.log("JWT Token 1:", token); // Log the token to the console

                    // Optionally, store the token in localStorage
                    localStorage.setItem('token', token);

                    setStatus('success');
                    alert("Logged in successfully");
                    navigate('/');
                }
            } catch (error) {
                setStatus("error");
                console.error("Login failed:", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (

        <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
            minHeight: '100vh',
            backgroundImage: "url('https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=600')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
    >
        <div className="container mt-5">
            <main className="form-signin mx-auto" style={{ maxWidth: '400px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Sign in</h1>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            placeholder="User Name"
                        />
                        <label htmlFor="username">User Name</label>
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-danger">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{ marginTop: '20px' }}
                    >
                        Sign in
                    </button>

                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3">Login successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3">Invalid Credentials</div>
                    )}
                </form>
            </main>
        </div>
        </div>
    );
}

export default Login;
