"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneEmployee = exports.putOneEmployee = exports.getOneEmployee = exports.searchEmployees = exports.postEmployees = exports.getEmployees = void 0;
const uuid_1 = require("uuid");
// Employees list in memories
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
/**
 * Get all employees
 *
 * @route GET /employees
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @return {void} - Response with employees list
 */
const getEmployees = (req, res) => {
    res.status(200).json(employees);
};
exports.getEmployees = getEmployees;
/**
 * Add new employee
 *
 * @route POST /employees
 * @param {Request<{}, {}, Omit<Employee, "id">>} req - Express request object ommitubg id of Employee from request body.
 * @param {Response} res - Express response object
 * @return {void} - Response message
 */
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
/**
 * Search employees by first name.
 *
 * @route GET /employees/search?firstname=firstname
 * @query { string } firstname - firstname of firstname input.
 * @param {Request<{},  {}, {}, {firstname: string}>} req - Express request object containing first name as firstname query string.
 * @param {Response} res - Express response object
 * @returns {void} Responds with list of employees.
 */
const searchEmployees = (req, res) => {
    const { firstname } = req.query;
    const results = employees.filter((employee) => employee.firstname.toLowerCase().includes(firstname.toLowerCase()));
    if (results.length === 0) {
        res.status(404).send(`No result with ${firstname}`);
        return;
    }
    res.status(200).json(results);
};
exports.searchEmployees = searchEmployees;
/**
 * Get employee by id
 *
 * @route GET /employees/:id
 * @param {Request<{ id: string }>} req - Express request object containing id
 * @param {Response} res - Express response object
 * @return {void} - Response with employees list
 */
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
/**
 * Update employee by id
 *
 * @route PUT /employees/:id
 * @param {Request<{ id: string }, {}, Partial<Employee>>} req - Express request object containing id, partiacl of Employee
 * @param {Response} res - Express response object
 * @return {void} - Response with employees list
 */
const putOneEmployee = (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, isMarried } = req.body;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    const updatedEmployee = Object.assign(Object.assign({}, employees[foundIndex]), { firstname: firstname !== null && firstname !== void 0 ? firstname : employees[foundIndex].firstname, lastname: lastname !== null && lastname !== void 0 ? lastname : employees[foundIndex].lastname, age: age !== null && age !== void 0 ? age : employees[foundIndex].age, isMarried: isMarried !== null && isMarried !== void 0 ? isMarried : employees[foundIndex].isMarried });
    employees[foundIndex] = updatedEmployee;
    res.status(200).json();
};
exports.putOneEmployee = putOneEmployee;
/**
 * Delete employee by ID
 *
 * @route DELETE /employees/:id
 * @param {Request<{id: string}>} req - Express request object containing ID
 * @param {Response} res - Express reponse object
 * @returns {void} Responds with employee objects
 */
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
