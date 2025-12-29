const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { authenticateToken, generateToken } = require('../middleware/auth');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await Admin.verifyCredentials(email, password);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin);
    res.json({
      success: true,
      admin,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current admin profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new admin (only for existing admins)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    const newAdmin = await Admin.create({ email, password, name });
    res.status(201).json({
      success: true,
      admin: newAdmin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all admins
router.get('/', authenticateToken, async (req, res) => {
  try {
    const admins = await Admin.getAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;