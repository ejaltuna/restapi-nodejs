import { Router } from "express";
import {
  createEmployee,
  deleteProducto,
  getProducto,
  getProductos,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all Employees
router.get("/productos", getProductos);

// GET An Employee
router.get("/producto/:id", getProducto);

// DELETE An Employee
router.delete("/producto/:id", deleteProducto);

// INSERT An Employee
router.post("/employees", createEmployee);

router.patch("/employees/:id", updateEmployee);

export default router;
