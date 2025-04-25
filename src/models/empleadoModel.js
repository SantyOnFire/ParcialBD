const pool = require('../db');

// Modelo para Empleado
class Empleado {
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM empleado');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM empleado WHERE id_empleado = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(empleado) {
    const { nombre, rol, id_rest } = empleado;
    try {
      const result = await pool.query(
        'INSERT INTO empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
        [nombre, rol, id_rest]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, empleado) {
    const { nombre, rol, id_rest } = empleado;
    try {
      const result = await pool.query(
        'UPDATE empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
        [nombre, rol, id_rest, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM empleado WHERE id_empleado = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Empleado;