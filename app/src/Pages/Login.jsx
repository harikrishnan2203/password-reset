import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

// Initial state for the login form
const initialState = {
  email: "",
  password: "",
};
function Login() {
  const navigate = useNavigate();

  // Use the AuthContext to set the user's authentication state
  const { setIsLoggedIn = () => {} } = useAuthContext()

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <Formik
                      initialValues={initialState}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (!values.password) {
                          errors.password = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        // Check if email and password are filled in
                        if (!values.email || !values.password) {
                          toast.warn("Please fill in all the required fields");
                          setSubmitting(false);
                          return;
                        }
                        if (values) {
                          fetch("http://localhost:5000/login", {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                            .then((result) => result.json())
                            .then((result) => {
                              if (result.success && result.token) {
                                toast.success(result.message);
                                // Store the token in session storage
                                sessionStorage.setItem("_tk", result.token);
                                // Set user's authentication state to true
                                setIsLoggedIn(true)
                                navigate("/home");
                              } else {
                                toast.error(result.message);
                                setSubmitting(false);
                              }
                            })
                            .catch((error) => {
                              // console.error(error);
                              const errorMessage =
                                error.message || "Login failed";
                              toast.error(errorMessage);
                              setSubmitting(false);
                            });
                        }
                      }}
                    >
                      {({
                        values,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="email">
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="johndoe@gmail.com"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="password">
                                Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="********"
                              />
                            </div>
                          </div>
                          <div className="mb-4 d-flex justify-content-end">
                            <Link to="/forgot-password">Forgot Password?</Link>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-4">
                            <label className="form-check-label" htmlFor="signin">
                              Don't have an account? <Link to="/">Sign up</Link>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                    <img
                      style={{
                        WebkitTransform: "scaleX(-1)",
                        transform: "scaleX(-1)",
                      }}
                      src="https://static.vecteezy.com/system/resources/previews/004/578/793/original/man-working-with-computer-at-desk-free-vector.jpg"
                      className="img-fluid"
                      alt="MERN"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
