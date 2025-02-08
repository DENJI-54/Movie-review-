import express from "express";
import { getAllMovies, getMovieById , hii} from "../controllers/global.js";
const app = express();
const global_router = express.Router();

app.use("movies", global_router);
global_router.get('/hi',hii)
global_router.get("/all", getAllMovies); //working
global_router.get("/user/:id", getMovieById); //working

export default global_router;
