const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
require('dotenv').config();

//*
//* middleware
//*

app.use(express.json());
app.use(express.static('./public'));
//*----------------------------------------------

//*
//* routes
//*

app.use('/api/v1/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

//*----------------------------------------------

//*
//*  App starter
//*

const port = process.env.PORT || 5000;
const appStart = async () => {
  console.log('Server is setting up...');
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening in ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
appStart();
