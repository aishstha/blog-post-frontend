import * as React from "react";

// import Overview from "./Overview";
// import Container from "./Container";
import BlogList from "./blogs/BlogList";
import CreateBlog from "./blogs/CreateBlog";
import { getLoggedInUserId } from "../../utils/verifyUser";
import SearchBar from "./SearchBar";

const Dashboard = () => (
  <div className="Score-card">
    {/* <Overview /> */}
    {/* <Container /> */}
    {getLoggedInUserId() && <CreateBlog />}
    <SearchBar />
    <BlogList />
  </div>
);

export default Dashboard;
