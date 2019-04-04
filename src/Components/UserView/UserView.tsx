import React from "react";
import UserContainer from "../UserContainer/UserContainer";

interface IProps {
  json: any;
}

class UserView extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public render() {
    const { cards } = this.props.json;
    return cards.length !== 0 ? (
      <React.Fragment>
        {cards.map((item: any, index: number) => {
          return (
            <UserContainer
              index={index}
              key={index}
              type={item.type}
              contents={item.contents}
            />
          );
        })}
      </React.Fragment>
    ) : null;
  }
}

export default UserView;
