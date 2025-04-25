const pool = require('../db');
// Modelo para Producto
class Producto {
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM producto');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM producto WHERE id_prod = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(producto) {
    const { nombre, precio } = producto;
    try {
      const result = await pool.query(
        'INSERT INTO producto (nombre, precio) VALUES ($1, $2) RETURNING *',
        [nombre, precio]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, producto) {
    const { nombre, precio } = producto;
    try {
      const result = await pool.query(
        'UPDATE producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
        [nombre, precio, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM producto WHERE id_prod = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Producto;