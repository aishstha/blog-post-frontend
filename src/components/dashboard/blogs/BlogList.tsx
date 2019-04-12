import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";

import * as postService from "../../../services/posts";
import { Link } from "react-router-dom";
import * as routes from "../../../constants/routes";
import { interpolate } from "../../../utils/string";

interface IBlogListProps {
  postDetails: Array<IPostDetails>;
  savePost: (postDetails: Array<IPostDetails>) => void;
}

interface IPostList {
  postInfo: IPostDetails;
  key: number;
}

class BlogList extends React.Component<IBlogListProps, {}> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
  }

  componentDidMount() {
    this.fetchAllBlogPosts();
  }

  fetchAllBlogPosts = async () => {
    try {
      const posts = await postService.fetchAllPosts();
      this.props.savePost(posts.data);
      // TODO use notify
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  render() {
    const { postDetails } = this.props;
    return (
      <div>
        <div className="page">
          <div className="container">
            <div className="block">
              <div className="block__content">
                <div className="tabs">
                  {postDetails && postDetails.length > 0 ? (
                    <ul className="tabs__list">
                      <li className="tabs__list__title tabs__list__title">
                        <a href="#advertisement" role="tab" data-toggle="tab">
                          All Blogs{" "}
                          <span className="Batch Batch--blue Batch--no">
                            {postDetails.length}
                          </span>
                        </a>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                  {postDetails && postDetails.length > 0
                    ? postDetails
                        .slice(0)
                        .reverse()
                        .map((post, index) => {
                          return <PostList postInfo={post} key={index} />;
                        })
                    : "No blogs found"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PostList: React.SFC<IPostList> = props => {
  const { postInfo, key } = props;
  return (
    <div className="tabs__content" key={key}>
      <div className="tabs__content__pane active" id="advertisement">
        <div className="Block-white Block-product">
          <div className="Block-product__content">
            <h2>
              {postInfo.title}
              <span className="Batch Batch--yellow Batch--icon">
                {postInfo.users ? postInfo.users.name : "User not found"}
              </span>
            </h2>
            <span className="publisher">Description:</span>
            <span className="budget">{postInfo.description}</span>
          </div>
          <Link
            to={interpolate(routes.BLOGS_INFO, {
              id: postInfo._id
            })}
            className="btn btn--blue"
          >
            DETAILS
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ postReducer }: any) => {
  return { postDetails: postReducer.postDetails };
};

const mapDispatchToProps = (dispatch: any) => ({
  savePost: (postDetails: Array<IPostDetails>) =>
    dispatch(Actions.storePosts(postDetails))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);
