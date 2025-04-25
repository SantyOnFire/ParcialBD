const pool = require('../db');

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedido');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};

// Obtener un pedido por ID
const getPedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM pedido WHERE id_pedido = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

// Crear un pedido
const createPedido = async (req, res) => {
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
      [fecha, id_rest, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
      [fecha, id_rest, total, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

// Eliminar un pedido
const deletePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM pedido WHERE id_pedido = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};

module.exports = {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido
};