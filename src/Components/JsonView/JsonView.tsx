import React from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";

const JsonViewContainer = styled.div`
  padding: 30px;
  overflow-y: auto;
`;

interface IProps {
  json: JSON;
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
