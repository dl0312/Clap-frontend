import React from "react";
import Editor from "../../Components/Editor";
import { POST, EDIT_POST } from "../../sharedQueries";
import { Query, Mutation } from "react-apollo";
import { toast } from "react-toastify";

interface IProps {
  match: { params: { postId: number } };
  history: any;
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
                onCompleted={data => this.confirm(data)}
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
