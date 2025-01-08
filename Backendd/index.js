const db = require("./db");
const express = require('express');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config({path:'C:/Users/Vibhu/React js/collab/Backendd/.env'});

const app = express()
// const port = 3001

app.use(cors())

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/physical',require('./routes/physical'))

app.listen(process.env.PORT, () => {
  console.log(`My app listening on port ${process.env.PORT} at http://localhost:${process.env.PORT}`);
})