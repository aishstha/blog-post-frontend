import * as React from 'react';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="d-flex justify-content-end">
          <div className="Footer__wrap">
            <span className="Footer__wrap__link">About</span>
            <span className="Footer__wrap__link">Privacy Policy</span>
            <span className="Footer__wrap__link">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
