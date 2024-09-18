import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function Menu() {
    const navigate = useNavigate();
    
    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        localStorage.removeItem("user");
        navigate('/login'); // Redirect to login
    };

    // Check if user is logged in based on the token in localStorage
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decode the token to get user info

    // console.log(user);

    if(user !== undefined && user !==null){
        localStorage.setItem("user", user.role);
        // localStorage.setItem("user", "user");
    }else{
        localStorage.setItem("user", "user");
    }

    // Handle search functionality
   

    return (
        <nav className="navbar navbar-expand-lg bg-dark rounded" aria-label="Thirteenth navbar example">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="true" aria-label="Toggle navigation" style={{ color: "white" }}>
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>
                <img src="https://images.pexels.com/photos/159825/color-pencil-drawing-coloring-colored-pencils-159825.jpeg?auto=compress&cs=tinysrgb&w=600" className="bi me-0" width="70" height="60" style={{ borderRadius: 50 }} alt="" />
                <Link className="navbar-brand col-lg-2 me-0" to="/" style={{ fontWeight: 600, fontSize: 20, color: "white" }}>DoConnect</Link>
                <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                    <ul className="navbar-nav col-lg-8 justify-content-lg-center">
                        
                        <Link className="nav-link " aria-current="page" to="/"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Home</li></Link>
                   

                        {user && user.role === 'user' && (
                            <>
                                <Link className="nav-link active" aria-current="page" to="/createquestion"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Post Question</li></Link>
                                <Link className="nav-link active" aria-current="page" to="/listallquestions"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Questions</li></Link>
                                <Link className="nav-link active" aria-current="page" to="/viewapprovedques/user"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Answers</li></Link>

                            </>
                        )}

                        {user && user.role === 'admin' && (
                            <>
                                <Link className="nav-link active" aria-current="page" to="/adminquestions"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Questions</li></Link>
                                <Link className="nav-link" to="/viewapprovedques/admin"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Answers</li></Link>
                                <Link className="nav-link" to="/userProfiles"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>User Profiles</li></Link>

                            </>
                        )}
                    </ul>

                    
                </div>

                <div className="dropdown" style={{ marginRight: 20 }}>
                    <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                        Menu
                    </button>
                    <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                        {!user && (
                            <>
                                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                <li><Link className="dropdown-item" to="/register">Register</Link></li>
                            </>
                        )}
                        {user && (
                            
                            <li><a className="dropdown-item" href="#!" onClick={handleLogout}>Logout</a></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
