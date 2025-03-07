"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controllers_1 = require("../controllers/employees.controllers");
const employeesRouter = (0, express_1.Router)();
employeesRouter.get("/", employees_controllers_1.getEmployees);
employeesRouter.post("/", employees_controllers_1.postEmployees);
employeesRouter.get("/search", employees_controllers_1.searchEmployees);
employeesRouter
    .route("/:id")
    .get(employees_controllers_1.getOneEmployee)
    .put(employees_controllers_1.putOneEmployee)
    .delete(employees_controllers_1.deleteOneEmployee);
exports.default = employeesRouter;
