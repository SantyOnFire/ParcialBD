const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

router.get('/productos-pedido/:id_pedido', consultasController.getProductosPorPedido);
router.get('/productos-mas-vendidos/:cantidad', consultasController.getProductosMasVendidos);
router.get('/ventas-restaurante', consultasController.getTotalVentasPorRestaurante);
router.get('/pedidos-fecha/:fecha', consultasController.getPedidosPorFecha);
router.get('/empleados-rol/:id_rest/:rol', consultasController.getEmpleadosPorRolYRestaurante);

module.exports = router;
