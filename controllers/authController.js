import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const registerUser = async (req, res) => {
  const { name, gender, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password sebelum disimpan di database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Buat user baru
    const newUser = new User({
      name,
      gender,
      email,
      password: hashedPassword,
    });

    // Simpan user baru ke database
    await newUser.save();

    // Buat token JWT
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      "ego"
    );

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah email terdaftar
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Cocokkan password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "ego"
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
