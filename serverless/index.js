const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();
app.use(express.json({ extend: true }));
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todo', require('./routes/todo'));

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
