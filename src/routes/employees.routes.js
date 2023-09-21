import { Router } from "express";
import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all productos
router.get("/productos", getProductos);

// GET An producto
router.get("/producto/:id", getProducto);

// DELETE An producto
router.delete("/producto/:id", deleteProducto);

// INSERT An producto
router.post("/producto", createProducto);

router.patch("/employees/:id", updateEmployee);

export default router;
