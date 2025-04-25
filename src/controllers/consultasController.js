const pool = require('../db');

// Obtener todos los productos de un pedido específico
const getProductosPorPedido = async (req, res) => {
  const { id_pedido } = req.params;
  try {
    const query = `
      SELECT p.id_prod, p.nombre, p.precio, dp.cantidad, dp.subtotal
      FROM producto p
      JOIN detallepedido dp ON p.id_prod = dp.id_prod
      WHERE dp.id_pedido = $1
    `;
    const result = await pool.query(query, [id_pedido]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos del pedido' });
  }
};

// Obtener los productos más vendidos (más de X unidades)
const getProductosMasVendidos = async (req, res) => {
  const { cantidad } = req.params;
  try {
    const query = `
      SELECT p.id_prod, p.nombre, SUM(dp.cantidad) as cantidad_total
      FROM producto p
      JOIN detallepedido dp ON p.id_prod = dp.id_prod
      GROUP BY p.id_prod, p.nombre
      HAVING SUM(dp.cantidad) > $1
      ORDER BY cantidad_total DESC
    `;
    const result = await pool.query(query, [cantidad]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos más vendidos' });
  }
};

// Obtener el total de ventas por restaurante
const getTotalVentasPorRestaurante = async (req, res) => {
  try {
    const query = `
      SELECT r.id_rest, r.nombre, SUM(p.total) as total_ventas
      FROM restaurante r
      JOIN pedido p ON r.id_rest = p.id_rest
      GROUP BY r.id_rest, r.nombre
      ORDER BY total_ventas DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener total de ventas por restaurante' });
  }
};

// Obtener los pedidos realizados en una fecha específica
const getPedidosPorFecha = async (req, res) => {
  const { fecha } = req.params;
  try {
    const query = `
      SELECT p.id_pedido, p.fecha, p.total, r.nombre as restaurante
      FROM pedido p
      JOIN restaurante r ON p.id_rest = r.id_rest
      WHERE p.fecha = $1
    `;
    const result = await pool.query(query, [fecha]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pedidos por fecha' });
  }
};

// Obtener los empleados por rol en un restaurante
const getEmpleadosPorRolYRestaurante = async (req, res) => {
  const { id_rest, rol } = req.params;
  try {
    const query = `
      SELECT e.id_empleado, e.nombre, e.rol
      FROM empleado e
      WHERE e.id_rest = $1 AND e.rol = $2
    `;
    const result = await pool.query(query, [id_rest, rol]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener empleados por rol y restaurante' });
  }
};

module.exports = {
  getProductosPorPedido,
  getProductosMasVendidos,
  getTotalVentasPorRestaurante,
  getPedidosPorFecha,
  getEmpleadosPorRolYRestaurante
}; 