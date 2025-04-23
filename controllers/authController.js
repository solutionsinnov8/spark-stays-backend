const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register Controller
const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 👉 Admin login
    if (email === 'admin@gmail.com' && password === '1234') {
      const adminUser = {
        _id: 'admin-id',
        fullName: 'Admin',
        email,
        role: 'admin',
      };

      const token = jwt.sign({ userId: 'admin-id', role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      return res.status(200).json({ token, user: adminUser });
    }

    // 👉 Regular user login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // ✅ Event planner login should only work if approved
    if (user.role === 'event_planner' && user.status !== 'approved') {
      return res.status(403).json({ message: 'Your account is not approved yet' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};



// Update Profile
const updateProfile = async (req, res) => {
  const userId =  req.user._id; 
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName: name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
  const userId = req.user._id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Failed to delete account' });
  }
};

const getAllEventPlanner = async (req, res) => {
  try {
    const planners = await User.find({ role: 'event_planner' });
    res.status(200).json(planners); // Respond with the list of planners
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch event planners' }); // Send error response
  }
};

const updatePlannerStatus = async (req, res) => {
  const { id, status } = req.body; 
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `Planner ${status} successfully`, user: updatedUser });
  } catch (error) {
    console.error('Error updating planner status:', error);
    res.status(500).json({ message: 'Failed to update planner status' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  deleteAccount, 
  getAllEventPlanner,
  updatePlannerStatus
};
