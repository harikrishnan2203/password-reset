const bcrypt = require('bcryptjs');
const saltRounds = 10;
const secret = "PASSWORD_RESET_FLOW";
const jwt = require("jsonwebtoken");
const { User } = require('../Model/userModel');

// create a new user
const createUser = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are mandatory",
      });
    }

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User with the same email already exists",
      });
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace plain text password with hashed password
    req.body.password = hashedPassword;

    // Create a new user with the hashed password
    const newUser = await User.create(req.body);

    // Return a success response with the token and user details
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // Return a server error response if an internal error occurs
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
};
