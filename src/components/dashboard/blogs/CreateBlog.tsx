import * as React from "react";
// import { CSSTransition } from "react-transition-group";

const CreateBlog: React.SFC<{}> = () => {
  return (
    <div className="container">
      <div className="block hidden-md">
        <div className="block__content">
          <div className="block__title">
            {/* <h2>Advertisement</h2> */}
          </div>
          <div className="Block-white">
            <p>
              <a href="#" className="btn btn--blue btn--icon">
                <i className="material-icons">add</i> Create New Blog
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
