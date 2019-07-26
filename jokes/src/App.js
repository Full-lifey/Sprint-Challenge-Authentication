import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Signup from './components/signUp';

function App() {
  return (
    <div className='App'>
      <Route path='/login' component={Signup} />
    </div>
  );
}

export default App;
