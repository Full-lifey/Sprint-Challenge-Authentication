const axios = require('axios');
const bcrypt = require('bcryptjs');
const generateToken = require('../auth/generateToken.js');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration

  try {
    const user = req.body;
    const hashPW = bcrypt.hashSync(user.password, 10);
    user.password = hashPW;
    const [id] = await db('users').insert(user);
    const newUserObj = await db('users')
      .where({ id })
      .first()
      .select('username', 'password');
    res.status(201).json(newUserObj);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await db('users')
      .where({ username })
      .first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${username}`, token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error, unable to login' });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
