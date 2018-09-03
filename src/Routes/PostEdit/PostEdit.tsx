import React from "react";
import Editor from "../../Components/Editor";
import { POST, EDIT_POST } from "../../sharedQueries";
import { Query, Mutation } from "react-apollo";

interface IProps {
  match: { params: { postId: number } };
  history: any;
}

class PostEdit extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
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
            return (
              <Mutation
                mutation={EDIT_POST}
                onCompleted={data =>
                  this.props.history.push(`/post/read/${post.id}`)
                }
              >
                {(EditPost, { data }) => (
                  <React.Fragment>
                    <Editor
                      postId={this.props.match.params.postId}
                      type="POST_EDIT"
                      state={JSON.parse(post.body)}
                      EditPost={EditPost}
                    />
                  </React.Fragment>
                )}
              </Mutation>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default PostEdit;
