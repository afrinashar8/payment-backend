const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('../routes/userRoutes');
const transactionRoutes = require('../routes/transactionRoutes');
const peerRoutes = require('../routes/peer');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/peers', peerRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
