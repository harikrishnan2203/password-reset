import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial state for the registration form
const initialState = {
  name: "",
  email: "",
  mobileNo: "",
  password: ""
};

function Signup() {
  // Use the React Router navigate function for navigation
  const navigate = useNavigate()
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <Formik
                      initialValues={initialState}
                      // Validation function for form fields
                      validate={(values) => {
                        const errors = {};
                        // Validate each form field
                        if (!values.name) {
                          errors.name = "Required";
                        } else if (!values.email) {
                          errors.email = "Required";
                        } else if (!values.mobileNo) {
                          errors.mobileNo = "Required";
                        } else if (!values.password) {
                          errors.password = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (values) {
                          // Perform a fetch request to the server
                          fetch("http://localhost:5000/signup", {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                            .then((response) => {
                              return response.json();
                            })
                            .then((result) => {
                              // console.log(result);
                              if (result.success === true) {
                                toast.success(result.message);
                                // Navigate to the login page after successful registration
                                navigate('/login')
                                resetForm();
                              } else {
                                toast.error(result.message);
                                setSubmitting(false);
                              }
                            })
                            .catch((error) => {
                              console.error(error);
                              const errorMessage =
                                error.message || "Registration failed";
                              toast.error(errorMessage);
                              setSubmitting(false);
                            });
                        }
                      }}
                    >
                      {({
                        values = {},
                        handleChange = () => {},
                        handleSubmit = () => {},
                        resetForm = () => {},
                      }) => (
                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="name">
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="John Doe"
                              />
                            </div>
                          </div>

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

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" htmlFor="mobileNo">
                                MobileNo
                              </label>
                              <input
                                type="text"
                                id="mobileNo"
                                value={values.mobileNo}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your mobile number"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
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

                          <div className="form-check d-flex justify-content-center mb-5">
                            <label
                              className="form-check-label"
                              htmlFor="login"
                            >
                              Already have an Account?{" "}
                              <Link to="/login">Login</Link>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://www.tridentspark.com/wp-content/uploads/2023/07/mern-stack-icon-1.png"
                      className="img-fluid"
                      alt="signup"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </section>
  );
}

export default Signup;
