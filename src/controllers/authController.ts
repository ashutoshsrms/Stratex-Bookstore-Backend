import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isSeller } = req.body;
    const user = new User({ name, email, password, isSeller });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, isSeller: user.isSeller },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
