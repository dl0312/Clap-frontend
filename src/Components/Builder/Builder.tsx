import React from "react";
import styled from "styled-components";
// import ReactDOM from "react-dom";
// import EditorDefaults from "src/EditorDefaults";

interface IBuilderContainerProps {
  state: "ISOVER" | "ONDRAG" | "NOTHING";
}

const BuilderContainer = styled<IBuilderContainerProps, any>("div")`
  width: 100%;
  height: 2px;
  background-color: goldenrod;
  z-index: ${props => (props.state === "ISOVER" ? "999" : null)};
  background-color: ${props => {
    switch (props.state) {
      case "ONDRAG":
        return "green";
      case "ISOVER":
        return "yellow";
      default:
        return "transparent";
    }
  }};
  transition: background-color 0.5s ease;
  width: 100%;
`;

class Builder extends React.Component<any, any> {
  public componentDidMount() {
    // const n = (ReactDOM.findDOMNode(
    //   this
    // )! as Element).getBoundingClientRect() as DOMRect;
  }
  render() {
    const { state } = this.props;
    return <BuilderContainer className={"Builder"} state={state} />;
  }
}

export default Builder;
