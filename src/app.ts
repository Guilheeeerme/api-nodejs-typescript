import express from "express";
import path from "path";

import routes from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

export default app;
