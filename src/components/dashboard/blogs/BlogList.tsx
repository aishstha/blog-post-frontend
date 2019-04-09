import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";

import * as postService from "../../../services/posts";

interface IBlogListProps {
  postDetails: Array<IPostDetails>;
  savePost: (postDetails: Array<IPostDetails>) => void;
}

interface IBlogListState {
  localpostDetails: Array<IPostDetails>;
  isLoading: boolean;
}

interface IPostList {
  postInfo: IPostDetails;
  key: number;
}

class BlogList extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    this.state = {
      localpostDetails: props.postDetails,
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchAllBlogPosts();
  }

  componentDidUpdate(prevProps: IBlogListProps) {
    if (prevProps !== this.props) {
      this.setState({
        localpostDetails: this.props.postDetails
      });
    }
  }

  fetchAllBlogPosts = async () => {
    try {
      const posts = await postService.fetchAllPosts();
      this.props.savePost(posts.data);
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  render() {
    const { localpostDetails } = this.state;
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
                  {localpostDetails.map((post, index) => {
                    return <PostList postInfo={post} key={index} />;
                  })}
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
              Title Here {postInfo.title}
              <span className="Batch Batch--yellow Batch--icon">
                {postInfo.users.name}
              </span>
            </h2>
            <span className="publisher">Description:</span>
            <span className="budget">{postInfo.description}</span>
          </div>
          <div className="Block-product__btn">
            <div className="btn btn--blue">DETAILS</div>
          </div>
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
