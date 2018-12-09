import React from "react";
import styled from "src/typed-components";

const WikiWindowContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

const WikiWindowButton = styled.button``;

const WikiWindowButtonIcon = styled.i``;

interface IState {
  isWikiWindowOpen: boolean;
}

class WikiWindow extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isWikiWindowOpen: true
    };
  }
  public render() {
    return (
      <WikiWindowContainer>
        <WikiWindowButton>
          <WikiWindowButtonIcon className="fas fa-book-open" /> WIKI
        </WikiWindowButton>
      </WikiWindowContainer>
    );
  }
}
export default WikiWindow;
