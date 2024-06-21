import express from "express";
import cors from "cors";
import { router } from "./app/routes/routes.js";

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/movies", router);

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
