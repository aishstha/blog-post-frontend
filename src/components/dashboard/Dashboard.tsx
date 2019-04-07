import * as React from 'react';

// import Footer from '../common/footer';
import Header from '../common/header';

import Overview from './Overview';

const Dashboard = () => (
  <div className="Score-card">
    <Header />
    <Overview />
    {/* <Footer /> */}
  </div>
);

export default Dashboard;
