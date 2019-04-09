import * as React from "react";

// import Overview from "./Overview";
// import Container from "./Container";
import BlogList from "./blogs/BlogList";
import CreateBlog from "./blogs/CreateBlog";

const Dashboard = () => (
  <div className="Score-card">
    {/* <Overview /> */}
    {/* <Container /> */}
    <CreateBlog />
    <BlogList />
  </div>
);

export default Dashboard;
