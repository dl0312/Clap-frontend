import React from "react";
import styled from "src/typed-components";
import MiniWiki from "../MiniWiki";

interface IWikiWindowContainerProps {
  isWikiWindowOpen: boolean;
}

const WikiWindowContainer = styled<IWikiWindowContainerProps, any>("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: ${props => (props.isWikiWindowOpen ? "0" : "-400px")};
  transition: 0.5s ease;
`;

const WikiWindowButton = styled.div`
  width: 100px;
  cursor: pointer;
  background-color: black;
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px;
`;

const WikiWindowButtonIcon = styled.i``;

interface IWikiContainerProps {
  isWikiWindowOpen: boolean;
}

const WikiContainer = styled<IWikiContainerProps, any>("div")`
  width: 100%;
  height: 400px;
  padding: 15px;
  background-color: black;
`;

interface IProps {
  gameId: number;
  handleOnChange: any;
  selectedIndex: number | null;
  selectedContent: any;
  activeEditorRef: any;
}

interface IState {
  isWikiWindowOpen: boolean;
}

class WikiWindow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isWikiWindowOpen: false
    };
  }

  public toggleWikiWindow = () => {
    this.setState({
      isWikiWindowOpen: !this.state.isWikiWindowOpen
    });
  };

  public render() {
    const {
      handleOnChange,
      selectedIndex,
      selectedContent,
      gameId
    } = this.props;
    const { isWikiWindowOpen } = this.state;
    return (
      <WikiWindowContainer isWikiWindowOpen={isWikiWindowOpen}>
        <WikiWindowButton onClick={this.toggleWikiWindow}>
          <WikiWindowButtonIcon className="fas fa-book-open" /> WIKI
        </WikiWindowButton>
        <WikiContainer isWikiWindowOpen={isWikiWindowOpen}>
          <MiniWiki
            gameId={gameId}
            handleOnChange={handleOnChange}
            selectedIndex={selectedIndex}
            selectedContent={selectedContent}
            activeEditorRef={this.props.activeEditorRef}
          />
        </WikiContainer>
      </WikiWindowContainer>
    );
  }
}
export default WikiWindow;
