const pool = require('../db');
// Modelo para Pedido
class Pedido {
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM pedido');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM pedido WHERE id_pedido = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(pedido) {
    const { fecha, id_rest, total } = pedido;
    try {
      const result = await pool.query(
        'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
        [fecha, id_rest, total]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, pedido) {
    const { fecha, id_rest, total } = pedido;
    try {
      const result = await pool.query(
        'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
        [fecha, id_rest, total, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM pedido WHERE id_pedido = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Pedido;