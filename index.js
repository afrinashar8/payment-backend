const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const transactionRoutes = require('./routes/transactionRoutes');
const { notFound, errorHandler } = require('./utils/errorHandler');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
