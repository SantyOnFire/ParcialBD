const pool = require('../db');

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

// Obtener un empleado por ID
const getEmpleadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM empleado WHERE id_empleado = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Crear un empleado
const createEmpleado = async (req, res) => {
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
      [nombre, rol, id_rest]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

// Actualizar un empleado
const updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  try {
    const result = await pool.query(
      'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
      [nombre, rol, id_rest, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Eliminar un empleado
const deleteEmpleado = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM empleado WHERE id_empleado = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

module.exports = {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
};