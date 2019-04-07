import * as React from "react";
import "../../App.css";

import { connect } from "react-redux";
import * as postService from "../../services/post";
import { IPostDetails } from "src/interface";

import { Actions } from "../../actions/posts";

interface IOverviewProps {
  postDetails: Array<IPostDetails>;
  savePosts: (postDetails: IPostDetails) => void;
}

interface IOverviewState {
  localPostDetails: Array<IPostDetails>;
}

class Overview extends React.Component<IOverviewProps, IOverviewState> {
  constructor(props: Readonly<IOverviewProps>) {
    super(props);
    this.state = {
      localPostDetails: props.postDetails
    };
  }

  componentDidMount() {
    this.fetchAllPosts();
  }

  componentDidUpdate(prevProps: IOverviewProps) {
    if (prevProps !== this.props) {
      this.setState({
        localPostDetails: this.props.postDetails
      });
    }
  }

  fetchAllPosts = async () => {
    try {
      const postResponse = await postService.fetchAllPosts();
      this.props.savePosts(postResponse.data);
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  handleEdit = async (id: string) => {
    try {
      const data = {
        name: "SSSSSSSSSSSSSAish"
      };
      await postService.updateUser(data, id);
      const postResponse = await postService.fetchAllPosts();

      this.props.savePosts(postResponse.data);
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  render() {
    const { localPostDetails } = this.state;

    return (
      <div className="page">
        <div className="container">
          <ul>
            {localPostDetails.length > 0
              ? localPostDetails.map((post, index) => {
                  return (
                    <div key={index}>
                      <div onClick={() => this.handleEdit(post._id)}>
                        {" "}
                        {post.name ? post.name : ""}
                      </div>
                      id: {post._id}
                    </div>
                  );
                })
              : ""}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ postReducer }: any) => {
  return { postDetails: postReducer.postDetails };
};

const mapDispatchToProps = (dispatch: any) => ({
  savePosts: (postDetails: IPostDetails) =>
    dispatch(Actions.storePosts(postDetails))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);
