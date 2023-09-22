import { pool } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Producto not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { codigo, nombre, descripcion, marca, modelo, precio, precio_dolar, stock, categoria_id, ruta_img, condicion, estado} = req.body;
    const [rows] = await pool.query(
      "INSERT INTO productos (codigo, nombre, descripcion, marca, modelo, precio, precio_dolar, stock, categoria_id, ruta_img, condicion, estado) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
      [codigo, nombre, descripcion, marca, modelo, precio, precio_dolar, stock, categoria_id, ruta_img, condicion, estado]
    );
    res.status(201).json({ id: rows.insertId, codigo, nombre, descripcion, marca, modelo, precio, precio_dolar, stock, categoria_id, ruta_img, condicion, estado});
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateProducto = async (req, res) => {
  console.log('estoy aqui');
  try {
     const { id } = req.params;
     const { codigo, nombre, descripcion, marca, modelo, precio, precio_dolar, stock, categoria_id, ruta_img, condicion, estado} = req.body;

     const [result] = await pool.query(
      "UPDATE productos SET codigo = IFNULL(?, codigo), nombre =  IFNULL(?, nombre), descripcion  =  IFNULL(?, descripcion),  marca =  IFNULL(?, marca), modelo =  IFNULL(?, modelo), precio =  IFNULL(?,precio), precio_dolar =  IFNULL(?, precio_dolar), stock =  IFNULL(?, stock), categoria_id =  IFNULL(?, categoria_id), ruta_img =  IFNULL(?, ruta_img), condicion =  IFNULL(?, condicion), estado =  IFNULL(?, estado) WHERE id = ?",
      [
        codigo,
        nombre,
        descripcion,
        marca,
        modelo,
        precio,
        precio_dolar,
        stock,
        categoria_id,
        ruta_img,
        condicion,
        estado,
        id,
      ]
    );

    // console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });

    // if(result.affectedRows === 1)return

    const [rows] = await pool.query("SELECT * FROM productos WHERE id= ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
