import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users', { withCredentials: true });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
            toast.error('Error fetching users');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`, { withCredentials: true });
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    const handleActivateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/activate/${id}`, {}, { withCredentials: true });
            toast.success('User activated successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error activating user:', error);
            toast.error('Error activating user');
        }
    };

    const handleDeactivateUser = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/deactivate/${id}`, {}, { withCredentials: true });
            toast.success('User deactivated successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deactivating user:', error);
            toast.error('Error deactivating user');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-image"
                 style={{
                     backgroundImage: "url('https://images.pexels.com/photos/2249961/pexels-photo-2249961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Replace with your image URL
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
                 }}>
                <div className="container bg-white p-5 shadow rounded">
                    <h1 className="text-center text-primary mb-4">Manage All Users</h1>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button 
                                                    onClick={() => handleActivateUser(user._id)}
                                                    className="btn btn-success btn-sm custom-btn"
                                                    disabled={user.status === 'active'}
                                                >
                                                    Activate
                                                </button>
                                                <button 
                                                    onClick={() => handleDeactivateUser(user._id)}
                                                    className="btn btn-warning btn-sm custom-btn"
                                                    disabled={user.status === 'inactive'}
                                                >
                                                    Deactivate
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="btn btn-danger btn-sm custom-btn"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style>
                {`
                .custom-btn {
                    margin: 0 5px;
                    padding: 10px 20px;
                    min-width: 100px;
                    min-height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .btn-group .custom-btn {
                    border-radius: 0;
                }

                .btn-group .custom-btn:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }

                .btn-group .custom-btn:last-child {
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
                `}
            </style>
        </>
    );
}
