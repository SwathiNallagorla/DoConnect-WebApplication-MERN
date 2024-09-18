import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/Users/userService"; // Import the registerUser function

const Register = () => {
    const navigate = useNavigate();
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            role: '',
            email: '' // Added email to initial values
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            role: Yup.string().required("Select a role"),
            email: Yup.string()
                .email('Invalid email address')
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    'Invalid email address'
                )
                .required('Email is required') // Added email validation
        }),
        onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
            try {
                await registerUser(values); // Use the registerUser function
                setStatus('success');
                resetForm();
                alert("Registered Successfully.........");
                navigate("/login");
            } catch (error) {
                setStatus("error");
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
        <div className="container" style={{ marginTop: 100 }}>
            <main className="form-signin w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Register</h1>
                    
                    <div className="form-floating">
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
                            <div className='text-danger'>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-danger'>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Email"
                        />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-danger'>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-floating">
                        <select
                            className="form-select"
                            id="role"
                            {...formik.getFieldProps('role')}
                        >
                            <option value='' disabled>..Select a role..</option>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                        <label htmlFor="role">Role</label>
                        {formik.touched.role && formik.errors.role ? (
                            <div className='text-danger'>{formik.errors.role}</div>
                        ) : null}
                    </div>

                    <div style={{ marginBottom: 50 }}></div>
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitting}>Register</button>
                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3">Registration successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3">Registration failed. Please try again.</div>
                    )}
                </form>
            </main>
        </div>
        </div>
    );
};

export default Register;
