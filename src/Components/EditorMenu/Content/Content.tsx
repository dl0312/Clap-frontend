import * as React from "react";
import styled from "styled-components";
import ContentItem from "../../ContentItem";

const ContentBody = styled.div`
  padding: 15px;
`;

const ContentColumn = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

interface IProps {
  masterCallback: any;
  onClickPushNewBlock: any;
}

interface IState {
  contentItems: Array<{ icon: string; name: string }>;
}

class Content extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contentItems: [
        // { icon: "fas fa-square", name: "BUTTON" },
        { icon: "fas fa-font", name: "TEXT" },
        { icon: "fas fa-image", name: "IMAGE" },
        { icon: "fab fa-youtube", name: "VIDEO" },
        { icon: "fas fa-divide", name: "DIVIDER" }
        // { icon: "fas fa-code", name: "HTML" },
        // { icon: "fab fa-hubspot", name: "SOCIAL" }
        // { icon: "fas fa-bars", name: "BANNER" },
        // { icon: "fas fa-ellipsis-h", name: "MENU" }
      ]
    };
  }

  public addItem = (name: string) => {
    console.log(`adding name: ` + name);
  };

  public render() {
    return (
      <ContentBody>
        <ContentColumn>
          {this.state.contentItems.map((item, index) => (
            <ContentItem
              key={index}
              item={item}
              icon={item.icon}
              name={item.name}
              masterCallback={this.props.masterCallback}
              onClickPushNewBlock={this.props.onClickPushNewBlock}
            />
          ))}
        </ContentColumn>
      </ContentBody>
    );
  }
}

export default Content;
