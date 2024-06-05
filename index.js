import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("Mongo Error", error.message));