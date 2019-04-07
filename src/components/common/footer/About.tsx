import * as React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="d-flex Overall-card flex-wrap">
        <div className="col-lg-3 col-sm-6 Overall-card--columns">
          <div className="d-flex d-sm-block flex-wrap justify-content-between">
            <div className="Icon-media d-flex align-items-start">
              <div className="Icon-media__icon">
                <i className="ed-people" />
              </div>
              <div className="Icon-media__number-details">
                <div className="Icon-media__number-details__count">About us</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
