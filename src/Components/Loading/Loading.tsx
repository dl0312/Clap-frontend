import React from "react";
import styled from "styled-components";

interface ILoadingContainerProps {
  color?: string;
}

const LoadingContainer = styled<ILoadingContainerProps, any>("div")`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .lds-ellipsis div {
    background: ${props => props.color};
  }
`;

interface IProps {
  color?: string;
}

class Loading extends React.Component<IProps, any> {
  render() {
    const { color } = this.props;
    return (
      <LoadingContainer color={color}>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </LoadingContainer>
    );
  }
}

export default Loading;
