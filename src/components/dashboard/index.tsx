import * as React from "react";

import DashboardRouter from "./DashboardRouter";

// import Footer from '../common/footer';
import Header from "../common/header";
import { getLoggedInUserId } from "../../utils/verifyUser";

const Dashboard = () => (
  <div className="Score-card">
    {getLoggedInUserId() && <Header />}
    <DashboardRouter />
    {/* <Footer /> */}
  </div>
);

export default Dashboard;
