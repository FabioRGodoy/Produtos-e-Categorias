import "express-async-errors";
import express from "express";
import { errorHandler } from "./errors/errors";
import { routes } from "./Routes/routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);
export default app;
