const pool = require('../db');

// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM producto WHERE id_prod = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Crear un producto
const createProducto = async (req, res) => {
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
      [nombre, precio, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM producto WHERE id_prod = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};