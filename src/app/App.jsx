import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>you are currently logged out</p>
          <button
            className="btn btn-primary btn-lg"
            type="button"
          >
            Login
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
