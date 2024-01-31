const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { User } = require('../Model/userModel');
require('dotenv').config();

// Update user password based on the reset token
const updatePassword = async (req, res) => {
  try {
    // Extract token and password from request parameters and body
    const { token } = req.params;
    const { password } = req.body;

    // Find user based on the reset token
    const user = await User.findOne({ token });

    // If user is not found with the given token
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Update user's password and clear the reset token
    user.password = hashedPassword;
    user.token = undefined;
    await user.save();

    // Return success response
    res.json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    /// Return a server error response if an internal error occurs
    res.status(500).json({
      success: false,
      error: 'Error resetting password. Please try again later.',
    });
  }
};

module.exports = {
  updatePassword,
};