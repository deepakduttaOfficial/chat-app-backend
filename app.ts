import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from "express";
import cors from "cors";

// Cors config file
import corsOption from "./config/cors.config";

// Routes
import Auth from "./routes/auth.route"

const app: Express = express();
const DEFAULT_ROUTE: string = "/api/v1"

// Middleware
app.use(cors(corsOption));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Routes Middleware
app.use(`${DEFAULT_ROUTE}/auth`, Auth)

export default app;
