const Package = require("../models/Package");

// Create a new package
const createPackage = async (req, res) => {
  try {
    const newPackage = new Package({
      ...req.body,
      planner: req.user._id,
    });
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Failed to create package" });
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};

// Get packages of the logged-in planner
const getPlannerPackages = async (req, res) => {
  try {
    const packages = await Package.find({ planner: req.user._id });
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Error fetching packages" });
  }
};

// ✅ Update package by ID
const updatePackage = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPackage = await Package.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ message: "Failed to update package" });
  }
};

// ✅ Delete package by ID
const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Failed to delete package" });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPlannerPackages,
  updatePackage,
  deletePackage,
};
