const express = require('express');
const connectToMongo = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

connectToMongo();

app.use('/api' , require('./routes/user'));

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost ${PORT}`);
});
