"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneEmployee = exports.putOneEmployee = exports.getOneEmployee = exports.searchEmployees = exports.postEmployees = exports.getEmployees = void 0;
const uuid_1 = require("uuid");
const employees = [
    {
        id: (0, uuid_1.v4)(),
        firstname: "Coco",
        lastname: "Ro",
        age: 20,
        isMarried: false,
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Zari",
        lastname: "Doe",
        age: 40,
        isMarried: true,
    },
    {
        id: (0, uuid_1.v4)(),
        firstname: "Lin",
        lastname: "Smith",
        age: 34,
        isMarried: false,
    },
];
// Get all employees
const getEmployees = (req, res) => {
    res.status(200).json(employees);
};
exports.getEmployees = getEmployees;
// Add new employees
const postEmployees = (req, res) => {
    const { firstname, lastname, age, isMarried } = req.body;
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname,
        lastname,
        age,
        isMarried,
    };
    employees.push(newEmployee);
    res.status(200).send("Successfully added an employee.");
};
exports.postEmployees = postEmployees;
// Search employees matched with keyword
const searchEmployees = (req, res) => {
    const { keyword } = req.query;
    const results = employees.filter((employee) => employee.firstname.toLowerCase().includes(keyword.toLowerCase()));
    if (results.length === 0) {
        res.status(404).send(`No result with ${keyword}`);
        return;
    }
    res.status(200).json(results);
};
exports.searchEmployees = searchEmployees;
const getOneEmployee = (req, res) => {
    const { id } = req.params;
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
        res.status(404).send("No result");
        return;
    }
    res.status(200).send(employee);
};
exports.getOneEmployee = getOneEmployee;
// Update employee
const putOneEmployee = (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, isMarried } = req.body;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    const updatedEmployee = Object.assign(Object.assign({}, employees[foundIndex]), { firstname: firstname !== null && firstname !== void 0 ? firstname : employees[foundIndex].firstname, lastname: lastname !== null && lastname !== void 0 ? lastname : employees[foundIndex].lastname, age: age !== null && age !== void 0 ? age : employees[foundIndex].age, isMarried: isMarried !== null && isMarried !== void 0 ? isMarried : employees[foundIndex].isMarried });
    employees[foundIndex] = updatedEmployee;
    res.status(200).json();
};
exports.putOneEmployee = putOneEmployee;
// Delete employee
const deleteOneEmployee = (req, res) => {
    const { id } = req.params;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    employees.splice(foundIndex, 1);
    if (foundIndex === -1) {
        res.status(404).send(`No one with id: ${id}`);
        return;
    }
    res.status(200).json(employees);
};
exports.deleteOneEmployee = deleteOneEmployee;
