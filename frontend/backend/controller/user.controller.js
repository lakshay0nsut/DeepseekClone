import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import config from "../config.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ errors: ["Email and password are required"] });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: ["User already exists"] });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashPassword });
    await newUser.save();
    
    return res.status(201).json({ message: "Signup succeeded" });
    
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ errors: [error.message] });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    // jwt code
    const token = jwt.sign({ id: user._id }, config.JWT_USER_PASSWORD, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions);
    return res
      .status(201)
      .json({ message: "User loggedin succeeded", user, token });
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({ errors: "Error in login" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt",{
        path: "/",
        domain: ".yourdomain.com", // Replace with your domain
        secure: true,             // HTTPS required
        sameSite: "none",         // Cross-site allowed
        httpOnly: true,
    });
    return res.status(200).json({ message: "Loggout succeeded" });
  } catch (error) {
    console.log("Error in logout: ", error);
    return res.status(500).json({ errors: "Error in logout" });
  }
};
