require('dotenv').config();
require('express-async-errors');

//extre security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const userAuthMiddleware = require('./middleware/authentication');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra packages
app.set('trust proxy', 1); //for heroku
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15m
    max: 100, //limit each IP to 100 request per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', userAuthMiddleware, jobsRouter);

// errors handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server starter
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
