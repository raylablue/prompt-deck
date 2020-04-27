import React from 'react';
import Header from '../organisms/Header';

function Logout() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div>
          <p>you are currently Signed in</p>
          <button
            className="btn btn-primary btn-lg"
            type="button"
          >
            Log out
          </button>
        </div>
      </header>
    </div>
  );
}

export default Logout;
