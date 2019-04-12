import * as React from "react";

import DashboardRouter from "./DashboardRouter";

import Header from "../common/header";

const Dashboard = () => (
  <div className="Score-card">
    <Header />
    <DashboardRouter />
  </div>
);

export default Dashboard;

