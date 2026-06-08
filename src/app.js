import express from "express";
import dotenv from "dotenv";
import routes from "./routes/api/index.js";
import { UrlController } from "./controller/index.js";

dotenv.config();

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : [];
const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];
const allAllowedOrigins = [...new Set([...allowedOrigins, ...defaultOrigins])];

// CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allAllowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Allow non-browser requests (like curl) or server-to-server calls if needed
    // You can remove this if you want strictly browser-only access
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.get("/:shortCode", UrlController.getOriginalLink);

export { app };
