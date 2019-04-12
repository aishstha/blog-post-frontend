import * as React from "react";
import { CSSTransition } from "react-transition-group";

const Container: React.SFC<{}> = () => {
  return (
    <div>
      <div className="page">
        <BlogList />
        <CreateNew />
        <ProfileView />
        <ProfileEdit />
        <CreateBlog />
      </div>
    </div>
  );
};

const ProfileEdit = () => {
  return (
    <div className="container">
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="form-section">
          <div className="close  hidden-sm">
            <i className="material-icons">close</i>
          </div>

          <h3>Profile Information</h3>

          <div className="form-group">
            <label className="form-group__label form-group__label--block">
              Full Name
            </label>
            <input
              className="form-group__control"
              name="Full name"
              type="text"
              value="aaa"
            />
          </div>
          <div className="form-group">
            <button className="btn btn--blue btn--lg" type="submit">
              Update Information
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const ProfileView = () => {
  return (
    <div className="container">
      <form>
        <div className="form-section">
          <div className="close  hidden-sm">
            <i className="material-icons">close</i>
          </div>

          <h3>Profile Update</h3>
          <div className="form-group">
            <label className="form-group__label form-group__label--block">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              className={`form-group__control`}
              value="asas"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label form-group__label--block">
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              className={`form-group__control`}
              value="asass"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label form-group__label--block">
              Email
            </label>
            <input
              name="email"
              type="text"
              className={`form-group__control`}
              value="aasa"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label form-group__label--block">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              className={`form-group__control`}
              value="asas"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const CreateBlog: React.SFC<{}> = () => {
  // let popUpClass = this.state.isPopUpOpen ? 'Popup' : 'Popup Popup--hidden';
  const popUpClass = "Popup";
  return (
    <div className="container">
      <div className="block hidden-md">
        <div className="block__content">
          <div className="block__title">{/* <h2>Advertisement</h2> */}</div>
          <div className="Block-white">
            <p>
              <a href="#" className="btn btn--blue btn--icon">
                <i className="material-icons">add</i> Create New Blog
              </a>
            </p>
          </div>

          <CSSTransition
            in={true}
            timeout={300}
            classNames="popup"
            unmountOnExit={false}
          >
            <div className={popUpClass}>
              <div className="Popup__inner Popup__inner--small">
                <div className="Popup__inner__header">
                  Advertisement Details
                  {/* <a className="close" onClick={this.togglePopUp}>
                    <i className="material-icons">close</i>
                  </a> */}
                </div>
                <div className="Popup__inner__content Popup__inner__content--space">
                  <div className="form-group form-group--block">
                    <label className="form-group__label">Title:</label>
                    <span className="form-group__text"> Testee</span>
                  </div>
                  <div className="form-group form-group--2col">
                    <label className="form-group__label">Publisher:</label>
                    <span className="form-group__text">TEst</span>
                  </div>
                  <div className="form-group form-group--2col">
                    <label className="form-group__label">Budget:</label>
                    <span className="form-group__text">$1000</span>
                  </div>
                  <div className="image-group">
                    <p>image</p>
                  </div>
                </div>
                <div className="Popup__inner__footer">
                  <div className="btn btn--blue ml-24">aprove</div>
                  <div className="btn btn--red--outline">reject</div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

const CreateNew = () => {
  return (
    <div className="container">
      <div className="block hidden-md">
        <div className="block__content">
          <div className="block__title">
            <h2>Advertisement</h2>
          </div>
          <div className="Block-white">
            <p>
              <a href="#" className="btn btn--blue btn--icon">
                <i className="material-icons">add</i> Create New Ad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogList = () => {
  return (
    <div className="container">
      <div className="block">
        <div className="block__content">
          <div className="tabs">
            <ul className="tabs__list">
              <li className="tabs__list__title tabs__list__title">
                <a href="#advertisement" role="tab" data-toggle="tab">
                  Recent Blogs{" "}
                  <span className="Batch Batch--blue Batch--no">20</span>
                </a>
              </li>
            </ul>
            <div className="tabs__content">
              <div className="tabs__content__pane active" id="advertisement">
                <div className="Block-white Block-product">
                  <div className="Block-product__img" />
                  <div className="Block-product__content">
                    <h2>
                      title
                      <span className="Batch Batch--yellow Batch--icon">
                        add
                      </span>
                    </h2>
                    <span className="publisher">
                      Publisher: <strong>pub</strong>
                    </span>
                    <span className="budget">Budget: $100</span>
                  </div>
                  <div className="Block-product__btn">
                    <div className="btn btn--blue">DETAILS</div>
                  </div>
                </div>
              </div>
              <div className="tabs__content__pane" id="driver" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Container;
