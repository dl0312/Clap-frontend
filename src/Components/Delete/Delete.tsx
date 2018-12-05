import React from "react";

interface IProps {
  callbackfromparent: any;
  index: number;
}

class Delete extends React.Component<IProps, any> {
  public render() {
    const { callbackfromparent, index } = this.props;
    return (
      <div onClick={() => callbackfromparent("delete", index)}>Delete</div>
    );
  }
}

export default Delete;
