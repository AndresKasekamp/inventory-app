import express from "express";
import cors from "cors";
import { router } from "./app/routes/routes.js";

const app = express();

const PORT = 8080;

console.log("env", `${process.env.INVENTORY_DATABASE_DNS}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`)


app.use(cors());
app.use(express.json());

app.use("/api/movies", router);

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
