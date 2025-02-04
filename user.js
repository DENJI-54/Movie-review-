import express from "express";
import { signUp, logIn, deleteUsers, getMovie } from "../controllers/users.js";
import  {redirectTo} from '../utilities/redirect.js'

const router = express.Router();

//user auth routes

router.post("/signin", signUp); //working
router.post("/login", logIn,redirectTo); //working
router.get("/getMovie/:id", getMovie); //working

//delette all documents
router.delete("/delete", deleteUsers);
export default router;