const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Direct approach to load environment variables
try {
  const envPath = path.resolve(__dirname, '.env');
  console.log('Looking for .env file at:', envPath);
  
  if (fs.existsSync(envPath)) {
    console.log('.env file found');
    const envConfig = fs.readFileSync(envPath, 'utf8');
    
    // Parse env file manually
    const envVars = envConfig.split('\n').filter(line => line.trim() !== '');
    envVars.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
        console.log(`Set ${key.trim()} environment variable`);
      }
    });
  } else {
    console.log('.env file not found, using fallback values');
    // Set fallback values
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecretkey123456789';
    process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
  }
} catch (err) {
  console.error('Error loading .env file:', err);
  // Set fallback values
   process.env.JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecretkey123456789';
    process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
   
}

// Verify environment variables are loaded
console.log('Environment check: JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Value exists (hidden)' : 'Missing');
console.log('PORT:', process.env.PORT);

// Import routes
const authRoutes = require('./src/routes/auth');
const jobRoutes = require('./src/routes/jobs');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Job Application Tracker API is running');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Test route is working',
    env: {
      jwt_secret_exists: !!process.env.JWT_SECRET,
      port_exists: !!process.env.PORT
    }
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-tracker')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
