import React from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";

const JsonViewContainer = styled.div`
  padding: 30px;
  overflow-y: auto;
`;

interface IProps {
  json: {
    rightMenu: number | null;
    view: "EDIT" | "USER" | "JSON";
    onDrag: "content" | "columnList" | null;
    selectedIndex: number | number[] | null;
    hoveredIndex: number | number[] | null;
    selectedContent: any;
    hoverImgJson: any;
    onImage: boolean;
    exShownImg: { url: string; id: string };
    pos: { x: number; y: number };
    title: string;
    cards: any[];
  };
}

class JsonView extends React.Component<IProps> {
  public render() {
    return (
      <JsonViewContainer>
        <ReactJson collapsed={3} src={this.props.json} />
      </JsonViewContainer>
    );
  }
}

export default JsonView;
