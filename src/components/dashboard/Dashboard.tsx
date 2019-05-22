import * as React from "react";

import BlogList from "./blogs/BlogList";
import CreateBlog from "./blogs/CreateBlog";
import { getLoggedInUserId } from "../../utils/verifyUser";
import SearchBar from "./SearchBar";

const Dashboard = () => (
  <div className="Score-card">
    {getLoggedInUserId() && <CreateBlog />}
    <SearchBar />
    <BlogList />
  </div>
);

export default Dashboard;
