import express from "express";
import employees, {
  getEmployee,
  getEmployees,
  getRandomEmployee,
} from "#db/employees";

const router = express.Router();

router.post("/", (req, res) => {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).send("Name is required");
  }

  const id = Math.max(...employees.map((employee) => employee.id)) + 1;
  const newEmployee = { id, name };
  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});
// above gives the new unique id, will return name and id when a
// new employee is created and sends and error if the
//  employee does not exist

// below are the empolyee routes that are placed here instead of the app.js
// changed the app.get to router.get
router.get("/", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
});

router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});
export default router;
