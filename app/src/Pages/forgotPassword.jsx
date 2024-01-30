import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Initial state for the login form
const initialState = {
  email: "",
};
function ForgotPassword() {

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
                      Forgot Password
                    </p>

                    <Formik
                      initialValues={initialState}
                      validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } 
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log("Form submitted with values:", values);
                        if (!values.email) {
                          toast.warn("Email is mandatory");
                          setSubmitting(false);
                          return;
                        }
                        if (values) {
                          fetch("http://localhost:5000/initiate-password-reset", {
                            method: "POST",
                            body: JSON.stringify(values),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                            .then((result) => result.json())
                            .then((result) => {
                              if (result.success) {
                                toast.success(result.message);
                                resetForm()
                              } else {
                                toast.error(result.message);
                                setSubmitting(false);
                              }
                            })
                            .catch((error) => {
                              const errorMessage =
                                error.message || "";
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
                          <div className="d-flex flex-row align-items-center mb-2">
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
                          <div className="mb-4 d-flex justify-content-end">
                          <Link to="/login">Back</Link>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                    <img
                      src="https://image.freepik.com/free-vector/forgot-password-concept-isolated-white_263070-194.jpg"
                      className="img-fluid rounded"
                      alt="forgot password"
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

export default ForgotPassword;
