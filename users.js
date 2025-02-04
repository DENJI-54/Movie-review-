
import express from "express";
import mongoose from "mongoose";
import User from "../models/usersModel.js";
import Movies from "../models/moviesModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists! Please login",
      });
    }
    //how do i encrpyt the pass word
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new User({ username, password: hashedPassword });
    const savedUser = await createUser.save();

    res.status(200).json({
      msg: `User ${savedUser} created succesfully!`
      
    });
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    res.status(500).json({ msg: "Failed to create user" });
  }
};

const logIn = async (req, res,next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        msg: "User  does not exist! Please sign up",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid password",
      });
    }
    
    // Return a success message or token/session
    const userToken = jwt.sign({ user: existingUser}, process.env.jwtPass);
    // Store the token in the cookie
    res.cookie("authcookie", userToken, { maxAge: 900000, httpOnly: true });
if(!userToken) {
  return res.status(401).json({
    msg: "Failed to generate token"
  })
}

// res.json({
//   msg: `User  ${existingUser.username} logged in successfully!!`,
// });
  next();
   

    
  } catch (error) {
    console.error(`Error logging in user: ${error}`);
    res.status(500).json({ msg: "Failed to log in user" });
  }
};


const deleteUsers = async (req, res) => {
  try {
    const womp = await User.deleteMany({});
    res.status(200).json({ msg: `Deleted ${womp.deletedCount} users` });
  } catch (error) {
    console.log(`Error deleteing users ${error}`);
  } finally {
    res.end();
  }
};

const getMovie = async (req, res) => {
  try {
      const userId = req.params.id;

      // Find the user by ID and populate the movies they created
      const user = await User.findById(userId).populate({
          path: 'movies',
          model: 'Movies'
      });

      if (!user) {
          return res.status(404).json({ message: 'User  not found' });
      }

      // Return only the populated movies
      console.log(`user is ${user}`);
      console.log(`movies are ${user.movies}`); // Using populated movies
      return res.json({
          user,
          movies: user.movies // Use populated movies instead of fetching again
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
  }
};

export { signUp,logIn, deleteUsers, getMovie };