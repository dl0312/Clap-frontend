import React from "react";
import styled from "styled-components";
import ContentBox from "../ContentBox";
// import ReactDOM from "react-dom";
import EditorDefaults from "src/EditorDefaults";

interface IBuilderContainerProps {
  state: "ISOVER" | "ONDRAG" | "NOTHING";
  type: "content" | "columnList";
  isOpen: boolean;
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
        return props.isOpen ? "35px" : "0px";
    }
  }};
  transition: background-color 0.2s ease, height 0.1s ease;
  width: 100%;
  position: relative;
`;

interface IState {
  isOpen: boolean;
}

class Builder extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { state, type } = this.props;
    const { isOpen } = this.state;
    return (
      <BuilderContainer className={"Builder"} state={state} isOpen={isOpen}>
        {type === "columnList" && (
          <ContentBox
            state={state}
            index={0}
            type={type}
            setStateBuilder={this.setStateBuilder}
            isOpen={isOpen}
          />
        )}
      </BuilderContainer>
    );
  }

  public setStateBuilder = (name: string, value: any) => {
    this.setState({ [name]: value } as any);
  };
}

export default Builder;
