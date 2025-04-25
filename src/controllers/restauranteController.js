const pool = require('../db');

// Obtener todos los restaurantes
const getRestaurantes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurante');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
};

// Obtener un restaurante por ID
const getRestauranteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM restaurante WHERE id_rest = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el restaurante' });
  }
};

// Crear un restaurante
const createRestaurante = async (req, res) => {
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el restaurante' });
  }
};

// Actualizar un restaurante
const updateRestaurante = async (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  try {
    const result = await pool.query(
      'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
      [nombre, ciudad, direccion, fecha_apertura, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el restaurante' });
  }
};

// Eliminar un restaurante
const deleteRestaurante = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM restaurante WHERE id_rest = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json({ message: 'Restaurante eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el restaurante' });
  }
};

module.exports = {
  getRestaurantes,
  getRestauranteById,
  createRestaurante,
  updateRestaurante,
  deleteRestaurante
};