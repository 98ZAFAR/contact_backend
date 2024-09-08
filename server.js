const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT||3000;

connectDB();

app.use(express.static(path.join(__dirname, './client')));

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(require('./middleware/errorHandler'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/user',require('./routes/clientRoutes'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
