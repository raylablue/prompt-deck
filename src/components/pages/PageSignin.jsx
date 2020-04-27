import React from 'react';
import Header from '../organisms/Header';

function Signin() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div>
          <p>you are currently logged out</p>
          <button
            className="btn btn-primary btn-lg"
            type="button"
          >
            Sign in
          </button>
        </div>
      </header>
    </div>
  );
}

export default Signin;
