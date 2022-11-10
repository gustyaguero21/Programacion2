import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { catrouter } from "./routes/category-routes";
import { prodrouter } from "./routes/product-router";
import { userrouter } from "./routes/user-routes";
import { aplication } from "./routes/login-routes";
import "./database";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(catrouter);
app.use(prodrouter);
app.use(userrouter);
app.use(aplication);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
