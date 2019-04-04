import React from "react";
import styled from "styled-components";
import ContentBox from "../ContentBox";
// import ReactDOM from "react-dom";
import EditorDefaults from "src/EditorDefaults";

interface IBuilderContainerProps {
  state: "ISOVER" | "ONDRAG" | "NOTHING";
  type: "content" | "columnList";
  device: "PHONE" | "TABLET" | "DESKTOP";
  isOpen: boolean;
}

const BuilderContainer = styled<IBuilderContainerProps, any>("div")`
  width: 100%;
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
  max-width: ${props =>
    props.device === "DESKTOP"
      ? "886px"
      : props.device === "TABLET"
      ? "640px"
      : "360px"};
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const OuterBuilder = styled.div`
  width: 100%;
`;

interface IProps {
  index: number;
  state: "ISOVER" | "ONDRAG" | "NOTHING";
  device: "PHONE" | "TABLET" | "DESKTOP";
  handleDrop?: any;
}

interface IState {
  isOpen: boolean;
}

class Builder extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { index, state, device, handleDrop } = this.props;
    const { isOpen } = this.state;
    return (
      <OuterBuilder>
        <BuilderContainer
          className={"Builder"}
          state={state}
          device={device}
          isOpen={isOpen}
        >
          <ContentBox
            state={state}
            index={index}
            setStateBuilder={this.setStateBuilder}
            isOpen={isOpen}
            handleDrop={handleDrop}
          />
        </BuilderContainer>
      </OuterBuilder>
    );
  }

  public setStateBuilder = (name: string, value: any) => {
    this.setState({ [name]: value } as any);
  };
}

export default Builder;
