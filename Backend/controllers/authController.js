const User = require('../modele/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Load environment variables
require('dotenv').config(); // make sure this line exists!

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ REGISTER CONTROLLER
exports.register = async (req, res) => {
  const { name, email, phone, password, role, address } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      address
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // 🔐 Check if JWT_SECRET is set
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role.toLowerCase() }, // 👈 fix here
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
