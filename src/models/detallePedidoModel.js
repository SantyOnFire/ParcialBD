const pool = require('../db');

// Modelo para DetallePedido
class DetallePedido {
  static async getAll() {
    try {
      const result = await pool.query('SELECT * FROM detallepedido');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM detallepedido WHERE id_detalle = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(detallePedido) {
    const { id_pedido, id_prod, cantidad, subtotal } = detallePedido;
    try {
      const result = await pool.query(
        'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
        [id_pedido, id_prod, cantidad, subtotal]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, detallePedido) {
    const { id_pedido, id_prod, cantidad, subtotal } = detallePedido;
    try {
      const result = await pool.query(
        'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
        [id_pedido, id_prod, cantidad, subtotal, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM detallepedido WHERE id_detalle = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DetallePedido;