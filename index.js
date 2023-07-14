import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import { authMiddleware } from "./authMiddleware.js";

const app = express();
mongoose.connect('mongodb+srv://egoabror:rahsando11@twl2023.skqnx60.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());

// app.use("/users", authMiddleware); // Middleware should be applied to the specific route
app.use("/", UserRoute); // Use UserRoute only for "/users" endpoint

app.listen(5000, () => console.log('Server up and running...'));
