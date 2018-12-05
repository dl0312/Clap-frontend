import * as React from "react";
import styled from "styled-components";
import ContentItem from "../../ContentItem";

interface IContentBodyProps {
  isEditorToolOpen: boolean;
}

const ContentBody = styled<IContentBodyProps, any>("div")`
  max-height: ${props => (props.isEditorToolOpen ? "261px" : "0px")};
  overflow: ${props => (props.isEditorToolOpen ? "visible" : "hidden")};
  transition-duration: 0s, 0.3s, 0s;
  transition-delay: 0s, 0s, 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22);
  transition-property: visibility, max-height, transform;
`;

const ContentColumn = styled.ul`
  width: 200px;
  padding-bottom: 9px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

interface IProps {
  masterCallback: any;
  onClickPushNewBlock: any;
  isEditorToolOpen: boolean;
}

interface IState {
  contentItems: Array<{
    icon: string;
    name: "Text" | "Image" | "Video" | "Divider" | "Table";
  }>;
}

class Content extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      contentItems: [
        // { icon: "fas fa-square", name: "BUTTON" },
        { icon: "fas fa-font", name: "Text" },
        { icon: "fas fa-image", name: "Image" },
        { icon: "fab fa-youtube", name: "Video" },
        { icon: "fas fa-divide", name: "Divider" },
        { icon: "fas fa-table", name: "Table" }
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
    const { isEditorToolOpen } = this.props;
    return (
      <ContentBody isEditorToolOpen={isEditorToolOpen}>
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
