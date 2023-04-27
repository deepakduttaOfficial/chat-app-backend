import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import "./config/db.config";

// Cors config file
import corsOption from "./config/cors.config";

// Routes
import Auth from "./routes/auth.route";

// Passport js config file
import "./config/passport.config";
import passport from "passport";
import envConfig from "./config/env.config";

const app: Express = express();

// Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes Middleware
app.use(`/api/auth`, Auth);

export default app;
