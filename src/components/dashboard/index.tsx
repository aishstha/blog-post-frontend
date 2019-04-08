import * as React from "react";

import DashboardRouter from "./DashboardRouter";

import Footer from '../common/footer';
import Header from "../common/header";

const Dashboard = () => (
  <div className="Score-card">
    <Header />
    <DashboardRouter />
    <Footer />
  </div>
);

export default Dashboard;
