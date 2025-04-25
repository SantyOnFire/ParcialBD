const express = require('express');
const pool = require('./src/db');


const app = express();
app.use(express.json());
const PORT = 3000;



// Rutas
app.use('/api/restaurantes', require('./src/routes/restauranteRoutes'));
app.use('/api/empleados', require('./src/routes/empleadoRoutes'));
app.use('/api/productos', require('./src/routes/productoRoutes'));
app.use('/api/pedidos', require('./src/routes/pedidoRoutes'));
app.use('/api/detalles', require('./src/routes/detallePedidoRoutes'));
app.use('/api/consultas', require('./src/routes/consultasRoutes'));

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API de comidas rápidas funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
