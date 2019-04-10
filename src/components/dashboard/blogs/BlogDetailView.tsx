import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";

import * as postService from "../../../services/posts";

interface IBlogListProps {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

interface IBlogListState {
  localpostDetails: IPostDetails;
  isLoading: boolean;
}

// interface IPostList {
//   postInfo: IPostDetails;
//   key: number;
// }

class BlogDetailView extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    this.state = {
      localpostDetails: props.currentPostDetails,
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchAllBlogPosts();
  }

  componentDidUpdate(prevProps: IBlogListProps) {
    if (prevProps !== this.props) {
      this.setState({
        localpostDetails: this.props.currentPostDetails
      });
    }
  }

  fetchAllBlogPosts = async () => {
    try {
      const posts = await postService.fetchPostById("5cad6ce0edd3e90c91a710b2");
      this.props.saveCurrentPost(posts.data);
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  render() {
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
                </div>
                {/* <Link
                  to={interpolate(routes.BLOGS_INFO, { id: code })}
                  className="TabNav__menu-nodes"
                  activeClassName="TabNav__menu-nodes--active"
                >
                  DETAILS
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const PostList: React.SFC<IPostList> = props => {
//   const { postInfo, key } = props;
//   console.log(">>>>>>>>>>>>>>>>>>.", postInfo);
//   return (
//     <div className="tabs__content" key={key}>
//       <div className="tabs__content__pane active" id="advertisement">
//         <div className="Block-white Block-product">
//           <div className="Block-product__content">
//             <h2>
//               {postInfo.title}
//               <span className="Batch Batch--yellow Batch--icon">
//                 {postInfo.users ? postInfo.users.name : "User not found"}
//               </span>
//             </h2>
//             <span className="publisher">Description:</span>
//             <span className="budget">{postInfo.description}</span>
//           </div>
//           <div className="Block-product__btn">
//             <div className="btn btn--blue">DETAILS</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const mapStateToProps = ({ postReducer }: any) => {
  return { currentPostDetails: postReducer.currentPostDetails };
};

const mapDispatchToProps = (dispatch: any) => ({
  saveCurrentPost: (currentPostDetails: IPostDetails) =>
    dispatch(Actions.storeCurrentPosts(currentPostDetails))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetailView);
