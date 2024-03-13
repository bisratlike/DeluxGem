// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

const sendResetPasswordEmail = (userEmail, resetPasswordToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "deluxgemstore@gmail.com",
      pass: "jrnc eviz hxpr vmyb ",
    },
  });

  const resetPasswordLink = `https://yourapp.com/reset-password?token=${resetPasswordToken}`;

  const mailOptions = {
    from: "deluxgemstore@gmail.com",
    to: userEmail,
    subject: "Reset Your Password",
    html: `<p>Click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reset password email:", error);
    } else {
      console.log("Reset password email sent:", userEmail, info.response);
    }
  });
};

exports.signup = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a new user record
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role, // Assuming role is provided in the request body
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  // Validate user credentials
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    "your-secret-key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    }

    // Generate reset password token and set expiration time (e.g., 1 hour)
    const resetPasswordToken = jwt.sign({ userId: user._id }, "yourSecretKey", {
      expiresIn: "1h",
    });
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour in milliseconds

    // Save the token and expiration time in the user model
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Send reset password email
    sendResetPasswordEmail(user.email, resetPasswordToken);

    res.json({
      message: "Password reset email sent. Check your email for instructions.",
      user: user.email,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired reset password token" });
    }

    // Update user's password and clear the reset password fields
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
