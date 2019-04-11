import * as React from "react";
// import { CSSTransition } from "react-transition-group";

import { coke } from "../../assests/images";

const Container: React.SFC<{}> = () => {
  return (
    <div>
      <div className="page">
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
                  <div
                    className="tabs__content__pane active"
                    id="advertisement"
                  >
                    {/* <AdvertisementBlock action={this.togglePopUp} /> */}

                    <div className="Block-white Block-product">
                      <div className="Block-product__img">
                        <img src={coke} alt="advertisement" />
                      </div>
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
                        <div
                          className="btn btn--blue"
                          // onClick={() => this.togglePopUp()}
                        >
                          DETAILS
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tabs__content__pane" id="driver" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
