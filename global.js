import express from "express";
import mongoose from "mongoose";
import Movies from "../models/moviesModel.js";
import Users from "../models/usersModel.js";


const getAllMovies = async (req, res) => {
  try {
    const result = await Movies.find();
    console.log(`All moviesMoviess ${result}`);
    res.json({
      movies: result
    })
  } catch (error) {
    console.log(`Error getting movies ${error}`);
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const reslut = await Users.findById(id).populate({
      path: "movies",
      select: ["title","ratings","desc","genre"]
    });
    console.log(id)
    return res.status(200).json({
      movie: reslut,
    });
  } catch (error) {
    res.status(400).json({ "error getting user ": error });
    console.log(`Error find user with the given id : ${error}`);
  }
};

const hii = (req,res) =>{
  console.log(`started`)
  res.send(`hiii from linux mx xfce`)
};

export { getAllMovies, getMovieById , hii };
