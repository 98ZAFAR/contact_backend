const dotnet = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT||3000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(require('./middleware/errorHandler'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
