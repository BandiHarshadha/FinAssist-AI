import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const safeUserResponse = (user) => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    googleId: user.googleId,
    photo: user.photo,
    provider: user.provider,
    annualIncome: user.annualIncome,
    monthlyIncome: user.monthlyIncome,
    monthlyExpenses: user.monthlyExpenses,
    emi: user.emi,
    savings: user.savings,
    goals: user.goals,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, username, email and password are required",
      });
    }

    const existingUser = await User.findByEmailOrUsername(email, username);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      provider: "local",
    });

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: safeUserResponse(user),
    });
  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/username and password are required",
      });
    }

    const user = await User.findByIdentifier(identifier);

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/username or password",
      });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: safeUserResponse(user),
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const googleLoginSuccess = async (req, res) => {
  try {
    const token = generateToken(req.user.id);

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  } catch (error) {
    console.error("Google Login Error:", error);

    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
};