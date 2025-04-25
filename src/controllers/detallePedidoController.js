const pool = require('../db');

// Obtener todos los detalles de pedidos
const getDetallesPedido = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM detallepedido');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener detalles de pedidos' });
  }
};

// Obtener un detalle de pedido por ID
const getDetallePedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM detallepedido WHERE id_detalle = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el detalle de pedido' });
  }
};

// Crear un detalle de pedido
const createDetallePedido = async (req, res) => {
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO detallepedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el detalle de pedido' });
  }
};

// Actualizar un detalle de pedido
const updateDetallePedido = async (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  try {
    const result = await pool.query(
      'UPDATE detallepedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
      [id_pedido, id_prod, cantidad, subtotal, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el detalle de pedido' });
  }
};

// Eliminar un detalle de pedido
const deleteDetallePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM detallepedido WHERE id_detalle = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
    }
    res.json({ message: 'Detalle de pedido eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el detalle de pedido' });
  }
};

module.exports = {
  getDetallesPedido,
  getDetallePedidoById,
  createDetallePedido,
  updateDetallePedido,
  deleteDetallePedido
};