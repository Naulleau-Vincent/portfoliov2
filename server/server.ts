import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import { EXPRESS_SETTINGS, NODE_ENV, CORS_ALLOWED } from "./constants/models";
import cookieParser from "cookie-parser";

console.log("🚀 Server starting..."); 

const app = express();

app.use(cookieParser());    
app.use(express.json());     
if (process.env.NODE_ENV === NODE_ENV.PRODUCTION) {
  app.set("trust proxy", 1);
} else {
  app.set("trust proxy", false);
}

if (process.env.NODE_ENV === NODE_ENV.PRODUCTION) {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
  app.use(helmet());
}

const allowedOrigins = new Set([
  CORS_ALLOWED.DEVELOPMENT,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  CORS_ALLOWED.PRODUCTION,
]);

const corsOptions: cors.CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); 
    if (allowedOrigins.has(origin)) {
      cb(null, true); 
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json({ limit: EXPRESS_SETTINGS.PAYLOADS_LIMIT }));

app.use("/api", routes);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
