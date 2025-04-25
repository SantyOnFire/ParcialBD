const pool = require('../db');
// Modelo para Restaurante
class Restaurante {
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM restaurante');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM restaurante WHERE id_rest = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(restaurante) {
    const { nombre, ciudad, direccion, fecha_apertura } = restaurante;
    try {
      const result = await pool.query(
        'INSERT INTO restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, ciudad, direccion, fecha_apertura]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, restaurante) {
    const { nombre, ciudad, direccion, fecha_apertura } = restaurante;
    try {
      const result = await pool.query(
        'UPDATE restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
        [nombre, ciudad, direccion, fecha_apertura, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM restaurante WHERE id_rest = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Restaurante;