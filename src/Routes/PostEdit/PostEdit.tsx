import React from "react";
import Editor from "../../Components/Editor";
import { POST, EDIT_POST } from "../../sharedQueries";
import { Query, Mutation } from "react-apollo";
import { toast } from "react-toastify";
import Loading from "src/Components/Loading";
import Helmet from "react-helmet";

interface IProps {
  match: { params: { postId: number } };
  history: any;
  location: { state: { gameId: number } };
}

class PostEdit extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public confirm = (data: any) => {
    const { EditPost } = data;
    if (EditPost.ok) {
      toast.success("Edit Post Success");
      this.props.history.push(`/post/read/${this.props.match.params.postId}`);
    } else {
      toast.error(EditPost.error);
    }
  };

  public render() {
    const { gameId } = this.props.location.state;
    return (
      <React.Fragment>
        <Query
          query={POST}
          variables={{ postId: this.props.match.params.postId }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `${error.message}`;
            const { post } = data.GetPostById;
            const body = JSON.parse(post.body);
            body.titleImg = post.titleImg;
            body.titleImgPos = post.titleImgPos;
            return (
              <Mutation
                mutation={EDIT_POST}
                onCompleted={data => this.confirm(data)}
              >
                {(EditPost, { loading, error, data }) => {
                  if (loading) {
                    return <Loading color="#000" />;
                  }
                  if (error) {
                    console.log("error");
                    return <div>{error.message}</div>;
                  }
                  return (
                    <React.Fragment>
                      <Helmet>
                        <title>EDIT POST | CLAP</title>
                      </Helmet>
                      <Editor
                        postId={this.props.match.params.postId}
                        type="POST_EDIT"
                        state={body}
                        EditPost={EditPost}
                        gameId={gameId}
                      />
                    </React.Fragment>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default PostEdit;
