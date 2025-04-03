const express = require("express");
const User = require ("../models/user.js");

const router = express.Router();

// ✅ GET: Fetch all users
router.get("/", async (req, res) => {
  try {
    console.log(User);
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/find/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find user by either Google ID or GitHub ID
      const user = await User.findOne({
        $or: [{ google: id }, { github: id }],
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });


router.post("/", async (req, res) => {
    try {
      const { username, github, google } = req.body;
  
      if (!github && !google) {
        return res.status(400).json({ message: "Either GitHub or Google is required" });
      }
  
      const newUser = new User({ username, github, google });
      const savedUser = await newUser.save();
      
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;