import { Router } from "express";
import {
  deleteOneEmployee,
  getEmployees,
  getOneEmployee,
  postEmployees,
  putOneEmployee,
  searchEmployees,
} from "../controllers/employees.controllers";

const employeesRouter = Router();

employeesRouter.get("/", getEmployees);
employeesRouter.post("/", postEmployees);
employeesRouter.get("/search", searchEmployees);
employeesRouter
  .route("/:id")
  .get(getOneEmployee)
  .put(putOneEmployee)
  .delete(deleteOneEmployee);

export default employeesRouter;
