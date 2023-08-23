const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const fs = require("fs");
const https = require("https");
const cors = require('cors'); // Import the cors package
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Remplacez par l'origine de votre frontend
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(`/api/goals/:goalId/objects`, require('./routes/objectRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
      res.sendFile(
          path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
  );
} else {
  app.get('/', (req, res) => res.send('/api/goals \n /api/objets'));
}

app.use(errorHandler);

// Load SSL/TLS certificates
const privateKey = fs.readFileSync('rootCAKey.pem', 'utf8');
const certificate = fs.readFileSync('rootCACert.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => console.log(`Server started on port ${port}`));
