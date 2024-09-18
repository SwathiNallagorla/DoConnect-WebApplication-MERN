import { Link } from "react-router-dom";

function Footer() {
  
  // Function to check if the user is authenticated using JWT token
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Returns true if token exists
  };

  // Function to decode JWT token and get the user role
  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // Decode the token to get the payload (assuming it's a base64-encoded JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role; // Assuming the role is stored in the token payload
  };

  const isAdmin = isAuthenticated() && getUserRole() === 'admin';

  return (
    <footer className="py-3 my-4 bg-dark text-white">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
       <b>DoConnect</b>
      </ul>
      <p className="text-center text-white">© 2024 Company, Inc</p>
    </footer>
  );
}

export default Footer;
