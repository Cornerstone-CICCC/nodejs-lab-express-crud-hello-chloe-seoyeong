import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import employeesRouter from "./routes/employees.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Welcome to Employees List</h1>");
});
app.use("/employees", employeesRouter);

// Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("Cannot find what you are looking for :(");
});

// Run Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
