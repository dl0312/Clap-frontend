import React, { Component } from "react";
import Content from "../EditorMenu/Content";
import Library from "../Library";
import styled from "styled-components";

const EditorSideBarContainer = styled.div`
  transition-duration: 0.4s, 0.4s, 0s;
  transition-delay: 0s, 0s, 0.4s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  bottom: 46px;
  width: 245px !important;
  height: auto;
  left: 0;
  border-right: 1px solid #dcdcdc;
  background-color: #fafafa;
  overflow: hidden;
  z-index: 10;
  position: absolute;
  top: 0;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
`;

const EditorToolContainer = styled.div`
  color: black;
`;

const TitleContainer = styled.div`
  display: block;
  position: relative;
  height: 50px;
  font-size: 14px;
  color: #000;
  text-align: left;
  border: 0;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  position: relative;
  width: 186px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-style: normal;
  line-height: 50px;

  font-weight: 600;
`;

interface IOptionToggleIconProps {
  isOpen: boolean;
}

const ToggleIcon = styled<IOptionToggleIconProps, any>("i")`
  position: absolute;
  top: 15px;
  right: 0;
  display: inline-block;
  font-size: 20px;
  background-position: -715px -858px;
  transform: ${props => (props.isOpen ? "rotate(0)" : "rotate(180deg)")};
  transition: 0.1s ease;
`;

const LibraryContainer = styled.div`
  border-top: 1px solid #ededed;
`;

const HelperContainer = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 246px;
  height: 46px;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  z-index: 1;
`;

const HelperTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

interface IProps {
  // func
  masterCallback: any;
  onClickPushNewBlock: any;
  rightMenu: number | null;
  cards: any[];
  view: "EDIT" | "USER" | "JSON";
  title: string;
  imageLibrary: any;
  hideEditorTool: boolean;
}

interface IState {
  isEditorToolOpen: boolean;
  isLibraryOpen: boolean;
}

class EditorSideBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isEditorToolOpen: true,
      isLibraryOpen: true
    };
  }

  public render() {
    const { imageLibrary, hideEditorTool } = this.props;
    const { isEditorToolOpen, isLibraryOpen } = this.state;
    return (
      <EditorSideBarContainer
        style={{ transform: hideEditorTool ? "translateX(-245px)" : undefined }}
      >
        <EditorToolContainer>
          <TitleContainer onClick={this.handleOnClickEditorToolToggleButton}>
            <TitleWrapper>
              <Title>Editor Tool</Title>
              <ToggleIcon
                className="fas fa-angle-up"
                isOpen={isEditorToolOpen}
              />
            </TitleWrapper>
          </TitleContainer>
          <Content
            isEditorToolOpen={isEditorToolOpen}
            onClickPushNewBlock={this.props.onClickPushNewBlock}
            masterCallback={this.props.masterCallback}
          />
        </EditorToolContainer>
        <LibraryContainer>
          <TitleContainer onClick={this.handleOnClickLibraryToggleButton}>
            <TitleWrapper>
              <Title>Library</Title>
              <ToggleIcon className="fas fa-angle-up" isOpen={isLibraryOpen} />
            </TitleWrapper>
          </TitleContainer>
          <Library imageLibrary={imageLibrary} />
        </LibraryContainer>
        <HelperContainer>
          <HelperTitle>I can help you</HelperTitle>
        </HelperContainer>
      </EditorSideBarContainer>
    );
  }

  public handleOnClickEditorToolToggleButton = (e: any) => {
    e.preventDefault();
    this.setState({ isEditorToolOpen: !this.state.isEditorToolOpen });
  };

  public handleOnClickLibraryToggleButton = (e: any) => {
    e.preventDefault();
    this.setState({ isLibraryOpen: !this.state.isLibraryOpen });
  };
}

export default EditorSideBar;
