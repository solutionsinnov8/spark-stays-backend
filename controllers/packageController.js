const Package = require("../models/Package");

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
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};

const getPlannerPackages = async (req, res) => {
  try {
    const packages = await Package.find({ planner: req.user._id });
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Error fetching packages" });
  }
};

module.exports = { createPackage, getAllPackages, getPlannerPackages };
