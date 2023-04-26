import express, { Router } from "express";
import { signUp } from "../controllers/auth.controller";

const route: Router = express.Router();

route.post("/", signUp)

export default route
