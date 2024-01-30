import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  // Access the authentication context to manage user login state
  const { setIsLoggedIn } = useAuthContext();
  // Use React Router's navigate function for navigation
  const navigate = useNavigate()

  // Logout function to clear session data and update login state
  const handleLogout = () => {
    // Clear the token from the session storage
    sessionStorage.removeItem('_tk');
    // Update the login state to false
    setIsLoggedIn(false);
    navigate('/login')
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Welcome to Home Page
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center mb-4">
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                    <img
                      src="https://i.ytimg.com/vi/CNHSzoR6KYg/maxresdefault.jpg"
                      className="img-fluid rounded"
                      alt="MERN"
                    ></img>
                  </div>
                </div>
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button onClick={handleLogout} className="btn btn-danger btn-lg">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
