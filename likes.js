import express from "express";
import {
  _like_aMovie,
  getLikedMovies,
  unlikeMovie,
} from "../controllers/like.js";
import _authCookieToken from "../middlewares/jwtVerify.js";
import { restrictTo } from "../utilities/authozi.js";
const app = express();
const likes_router = express.Router();

app.use("user", likes_router);

likes_router.get(
  "/likes",
  _authCookieToken,
  restrictTo(["user","ADMIN"]),
  getLikedMovies
);
likes_router.post(
  "/movies/likes/:id",
  _authCookieToken,
  restrictTo(["user", "ADMIN"]),
  _like_aMovie
);
likes_router.delete(
  "/delete",
  _authCookieToken,
  restrictTo(["user", "ADMIN"]),
  unlikeMovie
);

export default likes_router;
