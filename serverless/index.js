const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

const PORT = process.env.PORT || 4000;

app.use(express.json({ extend: true }));

app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
