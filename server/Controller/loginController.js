const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { User } = require('../Model/userModel');

// Function to handle user login
const loginUser = async (req, res) => {
  try {
    // Destructure email, mobileNo, and password from the request body
    const { email, password } = req.body;

    // Find the user based on the query
    const response = await User.findOne({email});

    if (response) {
      // Use bcrypt.compare with await to compare passwords
      const result = await bcrypt.compare(password, response.password);

      if (result) {
        // Generate a JWT token upon successful login
        const token = jwt.sign({ role: ["user"] }, process.env.SECRET, { expiresIn: 60 * 5 });

        // Return a success response with the token
        res.status(200).json({
          success: true,
          message: "Login Successful",
          token: token,
        });
      } else {
        // Return an unauthorized response if the password is incorrect
        res.status(401).json({
          success: false,
          message: "Email id or password is wrong",
        });
      }
    } else {
      // Return an unauthorized response if the user is not found
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    // Return a server error response if an internal error occurs
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
};
