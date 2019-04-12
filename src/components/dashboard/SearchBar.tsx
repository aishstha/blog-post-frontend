import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../actions/posts";
import { IPostDetails } from "../../interface";

import * as postService from "../../services/posts";

interface IBlogListProps {
  postDetails: any;
  savePost: (postDetails: Array<IPostDetails>) => void;
}

interface IBlogListState {
  postList: any;
  items: any;
  searchString: string;
}

class SearchBar extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    this.state = {
      postList: props.postDetails,
      items: [],
      searchString: ""
    };
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps !== this.props) {
      this.setState({
        postList: this.props.postDetails
      });
    }
  }

  handleSearch = (event: any) => {
    event.preventdefault();
    this.setState({
      searchString: event.target.value
    });
  };

  handleChange = (e: any) => {
    this.setState({
      searchString: e.target.value
    });
  };

  onSearch = async () => {
    const posts = await postService.fetchByQueryParams(this.state.searchString);

    this.props.savePost(posts.data);
  };

  handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    const searchString = e.target.value;
    try {
      const posts = await postService.fetchByQueryParams(searchString);

      this.props.savePost(posts.data);
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="block hidden-md">
          <div className="block__content">
            <div className="Block-white">
              <div className="form-section">
                <div className="form-group">
                  <input
                    className="form-group__control"
                    name="searchString"
                    placeholder="Search blog"
                    onChange={e => {
                      this.handleSearchSubmit(e);
                    }}
                  />
                  <a className="form-input-icon" onClick={e => this.onSearch()}>
                    <i className="material-icons">search</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
)(SearchBar);

