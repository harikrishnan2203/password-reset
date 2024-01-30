## Password Reset Flow
 - This project provides a secure and user-friendly implementation of a password reset flow for a web application. It is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, ensuring robust backend functionality and a modern, responsive frontend.

## Project Overview
 - The Password Reset Flow project addresses the common need for users to reset their passwords in case they forget them. It consists of the following components:

## Backend Server: 
 - Handles user authentication, password reset initiation, and password updates.

## Frontend Interface: 
 - User-friendly forms for signup, login, initiating password reset, updating the password, and a home page.

## Database (MongoDB): 
 - Stores user information securely.

## Table of Contents
 - Prerequisites
 - Project Structure
 - Endpoints
 - Configuration
 - Dependencies
 - License

## Prerequisites
 - Ensure you have the following prerequisites installed:

 - Node.js
 - MongoDB

## Project Structure
 - The project is organized into several files and directories:

 - /Client: Frontend React.js application.
 - /src: React components and styles.
 - /public: Static assets.
 - /Server: Backend Node.js application.

 - /Controller: Controllers handling business logic.
 - /Database: Database connection configuration.
 - /Router: Express.js route definitions.
 - /app.js: Main server file.

 - Model/userModel.js: Mongoose model for the User schema.
 - Controller/signupController.js: Controller for user signup logic.
 - Controller/loginController.js: Controller for user login logic.
 - Controller/forgotPassController.js: Controller for initiating the password reset process.
 - Controller/updatePassController.js: Controller for updating the password using the provided token.

## Endpoints
 - The following API endpoints are available:

 - POST /signup: Register a new user.
 - POST /login: Authenticate and log in a user.
 - POST /initiate-password-reset: Initiate the password reset process.
 - POST /update-password/:token: Update the password using the provided token.

## Dependencies
 - Main dependencies used in the project:
 - express
 - mongoose
 - body-parser
 - cors
 - react
 - formik
 - react-router-dom
 - nodemailer

 ## License
 - MIT License