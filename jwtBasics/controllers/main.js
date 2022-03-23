//* check username, password in post(login) request
//* if exist create new JWT
//* send back to front-end

//* setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken');
const { BadRequest } = require('../errors/');

const login = async (req, res) => {
  const { username, password } = req.body;
  //* to validate if it is undefined use moongose Scheme val
  //* another option is to use another layer of val using Joi
  //* the last method, is just to use logic in here (controller) - using this with customAPIError
  if (!username || !password) {
    throw new BadRequest('Please provide email and password');
  }
  //*this id it just for demo, db will give this
  const id = new Date().getDate();
  //* try to keep payload small
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is you authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
