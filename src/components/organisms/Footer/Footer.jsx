import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer
      className="footer py-3 o-footer text-center"
    >
      <div className="container">
        <a
          className="btn btn-outline-primary"
          href="https://github.com/rachel-blue/my-movies"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
        >
          View the Source Code
        </a>
      </div>
    </footer>
  );
}

export default Footer;
