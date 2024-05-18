const express = require('express');
const cors = require('cors');
const combinedRouter = require('./combinedRouter');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(combinedRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}😊`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!😊');
});
