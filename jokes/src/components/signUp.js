import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='signup-form'>
      <form onSubmit={this.signUp}>
        <h1>Create Your Account</h1>
        <p className='have-account'>
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
        <input
          type='username'
          placeholder='username'
          value={username}
          onChange={username + setUsername}
          name='username'
        />
        <input
          type='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChanges}
          name='password'
        />
        <button>Sign Up!</button>
      </form>
      <div className='sign-up-img'>
        <div className='text-on-top'>
          <h1>Tabless Thursdays</h1>
          <h2>Best Tab Management</h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
