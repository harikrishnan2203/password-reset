const { User } = require('../Model/userModel');
const randomString = require('randomstring');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create nodemailer transporter with Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Function to initiate the password reset process
const initiatePasswordReset = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Check if the user with the provided email exists
    const verifyUser = await User.findOne({ email });

    if (!verifyUser) {
      // Return a 404 response if the user is not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate a random token and update the user's token field
    const token = randomString.generate(12);
    verifyUser.token = token;
    await verifyUser.save();

    // Log the user for debugging purposes
    // console.log(verifyUser);

    // Construct the reset link
    const resetLink = `https://password-reset-flow-22.netlify.app//update-password/${token}`;

    // Define email options
    const mailOptions = {
      from: 'harikrishnanr1103@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    // Send the password reset email
    await transporter.sendMail(mailOptions);

    // Return a success response
    res.json({ success: true, message: 'Password reset email sent successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    // console.error('Error initiating password reset:', error);
    res.status(500).json({ success: false, error: 'Error initiating password reset' });
  }
};

module.exports = {
  initiatePasswordReset,
};
