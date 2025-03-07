import { Request, Response } from "express";
import { Employee } from "../types/employees";
import { v4 as uuidv4 } from "uuid";

// Employees list in memories
const employees: Employee[] = [
  {
    id: uuidv4(),
    firstname: "Coco",
    lastname: "Ro",
    age: 20,
    isMarried: false,
  },
  {
    id: uuidv4(),
    firstname: "Zari",
    lastname: "Doe",
    age: 40,
    isMarried: true,
  },
  {
    id: uuidv4(),
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
export const getEmployees = (req: Request, res: Response) => {
  res.status(200).json(employees);
};

/**
 * Add new employee
 *
 * @route POST /employees
 * @param {Request<{}, {}, Omit<Employee, "id">>} req - Express request object ommitubg id of Employee from request body.
 * @param {Response} res - Express response object
 * @return {void} - Response message
 */
export const postEmployees = (
  req: Request<{}, {}, Omit<Employee, "id">>,
  res: Response
) => {
  const { firstname, lastname, age, isMarried } = req.body;
  const newEmployee = {
    id: uuidv4(),
    firstname,
    lastname,
    age,
    isMarried,
  };
  employees.push(newEmployee);
  res.status(200).send("Successfully added an employee.");
};

/**
 * Search employees by first name.
 *
 * @route GET /employees/search?keyword=firstname
 * @query { string } keyword - Keyword of firstname input.
 * @param {Request<{},  {}, {}, {keyword: string}>} req - Express request object containing first name as keyword query string.
 * @param {Response} res - Express response object
 * @returns {void} Responds with list of employees.
 */
export const searchEmployees = (
  req: Request<{}, {}, {}, { keyword: string }>,
  res: Response
) => {
  const { keyword } = req.query;
  const results: Employee[] = employees.filter((employee) =>
    employee.firstname.toLowerCase().includes(keyword.toLowerCase())
  );

  if (results.length === 0) {
    res.status(404).send(`No result with ${keyword}`);
    return;
  }
  res.status(200).json(results);
};

/**
 * Get employee by id
 *
 * @route GET /employees/:id
 * @param {Request<{ id: string }>} req - Express request object containing id
 * @param {Response} res - Express response object
 * @return {void} - Response with employees list
 */
export const getOneEmployee = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    res.status(404).send("No result");
    return;
  }

  res.status(200).send(employee);
};

/**
 * Update employee by id
 *
 * @route PUT /employees/:id
 * @param {Request<{ id: string }, {}, Partial<Employee>>} req - Express request object containing id, partiacl of Employee
 * @param {Response} res - Express response object
 * @return {void} - Response with employees list
 */
export const putOneEmployee = (
  req: Request<{ id: string }, {}, Partial<Employee>>,
  res: Response
) => {
  const { id } = req.params;
  const { firstname, lastname, age, isMarried } = req.body;
  const foundIndex: number = employees.findIndex(
    (employee) => employee.id === id
  );
  const updatedEmployee: Employee = {
    ...employees[foundIndex],
    firstname: firstname ?? employees[foundIndex].firstname,
    lastname: lastname ?? employees[foundIndex].lastname,
    age: age ?? employees[foundIndex].age,
    isMarried: isMarried ?? employees[foundIndex].isMarried,
  };
  employees[foundIndex] = updatedEmployee;
  res.status(200).json();
};

/**
 * Delete employee by ID
 *
 * @route DELETE /employees/:id
 * @param {Request<{id: string}>} req - Express request object containing ID
 * @param {Response} res - Express reponse object
 * @returns {void} Responds with employee objects
 */
export const deleteOneEmployee = (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const foundIndex = employees.findIndex((employee) => employee.id === id);
  employees.splice(foundIndex, 1);
  if (foundIndex === -1) {
    res.status(404).send(`No one with id: ${id}`);
    return;
  }
  res.status(200).json(employees);
};
