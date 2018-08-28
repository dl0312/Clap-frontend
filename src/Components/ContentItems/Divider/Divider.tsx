import * as React from "react";
import styled from "styled-components";

const DividerContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const DividerLine = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
`;

const Divider: React.SFC<any> = ({}) => {
  return (
    <DividerContainer className="content">
      <DividerLine />
    </DividerContainer>
  );
};

export default Divider;
