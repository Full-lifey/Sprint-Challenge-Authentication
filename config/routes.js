const axios = require('axios');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const user = req.body;
  const hashPW = bcrypt.hashSync(user.password, 10);
  user.password = hashPW;

  try {
    const [id] = await db('users').insert(user);
    console.log('id', id);
    const newUserObj = await db('users')
      .where({ id })
      .first()
      .select('username', 'password');
    console.log(newUserObj);
    res.status(201).json(newUserObj);
  } catch (err) {
    res.status(500).json(err);
  }
}

function login(req, res) {
  // implement user login
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
