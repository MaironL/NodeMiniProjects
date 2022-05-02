require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const producsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//*
//* middleware

app.use(express.json());

//*----------------------------------------------

//*
//* routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products</a> ');
});
app.use('/api/v1/products', producsRouter);

//*----------------------------------------------

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//*----------------------------------------------

//*
//*  App starter

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // eslint-disable-next-line no-undef
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening in ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
