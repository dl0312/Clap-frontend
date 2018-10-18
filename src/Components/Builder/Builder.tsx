import React from "react";
import styled from "styled-components";
import ContentBox from "../ContentBox";
// import ReactDOM from "react-dom";
import EditorDefaults from "src/EditorDefaults";

interface IBuilderContainerProps {
  state: "ISOVER" | "ONDRAG" | "NOTHING";
  type: "content" | "columnList";
}

const BuilderContainer = styled<IBuilderContainerProps, any>("div")`
  width: 100%;
  max-width: 800px;
  background-color: goldenrod;
  z-index: ${props => (props.state === "ISOVER" ? "999" : null)};
  background-color: ${props => {
    switch (props.state) {
      case "ONDRAG":
        return EditorDefaults.BUILDER_ONDRAG_COLOR;
      case "ISOVER":
        return EditorDefaults.BUILDER_ISOVER_COLOR;
      default:
        return EditorDefaults.BUILDER_NOTHING;
    }
  }};
  height: ${props => {
    switch (props.state) {
      case "ONDRAG":
        return "2px";
      case "ISOVER":
        return "4px";
      default:
        return null;
    }
  }};
  transition: background-color 0.2s ease, height 0.2s ease;
  width: 100%;
  position: relative;
`;

class Builder extends React.Component<any, any> {
  public componentDidMount() {
    // const n = (ReactDOM.findDOMNode(
    //   this
    // )! as Element).getBoundingClientRect() as DOMRect;
  }
  render() {
    const { state, type } = this.props;
    return (
      <BuilderContainer className={"Builder"} state={state}>
        {type === "columnList" && (
          <ContentBox state={state} index={0} type={type} />
        )}
      </BuilderContainer>
    );
  }
}

export default Builder;
