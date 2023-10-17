import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

// Conexión a MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/backend')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.log('Error al conectar a MongoDB:', error));

// Middlewares
app.use(bodyParser.json());
app.use(morgan()); // Registra las solicitudes HTTP

// Rutas
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/orders', orderRoutes);

// Función para mostrar rutas disponibles
function displayRoutes() {
  console.log('Available Endpoints:');
  console.log('======================================');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(
        `${middleware.route.stack[0].method.toUpperCase()} \t ${
          middleware.route.path
        }`
      );
    } else if (middleware.name === 'router') {
      // Extract the base route from the regexp
      const baseRoute = middleware.regexp.source.split('\\/')[1];
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(
            `${handler.route.stack[0].method.toUpperCase()} \t /${baseRoute}${
              handler.route.path
            }`
          );
        }
      });
    }
  });
  console.log('======================================');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  displayRoutes();
});
