import * as React from "react";
import styled from "styled-components";
import Sketch from "../../Utility/Sketch";
import MiniWiki from "../MiniWiki";
import Upload from "../Upload";
// import onClickOutside from "react-onclickoutside";

interface IBlockOptionContainerProps {
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT" | "POST_ADD" | "POST_EDIT";
  isSelected: boolean;
}

const BlockOptionContainer = styled<IBlockOptionContainerProps, any>("div")`
  position: ${props =>
    props.type === "WIKIIMAGE_ADD" || props.type === "WIKIIMAGE_EDIT"
      ? null
      : "absolute"};
  top: 0px;
  min-width: 250px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: #505659;
  transition: top 0.5s ease, opacity 0.5s ease, height 0.5s ease;
  z-index: ${props => (props.isSelected ? "1" : "-1")};
  opacity: ${props => (props.isSelected ? "1" : "0")};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  height: 45px;
  box-shadow: 0px 1px 5px #888;
`;

const ButtonTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  font-size: 16px;
  width: 35px;
  border: none;
  border-left: 1px solid #e6e6e6;
  background-color: #fff;
  height: 45px;
`;

const OptionRows = styled.div`
  padding-top: 5px;
`;

const Option = styled.div``;

const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: rgb(234, 234, 234);
`;

const OptionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: rgb(81, 97, 103);
`;

const MinimizeButton = styled.button`
  border: none;
  background-color: transparent;
`;

const FeatureColumn = styled.div`
  padding: 0 20px;
  font-size: 12px;
`;

const FunctionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const FunctionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8f9699;
  font-weight: 600;
`;

const UrlColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const ImageSrc = Input.extend`
  height: 33px;
`;

// interface IUrlColumnInputProps {
//   hasRightButton: boolean;
// }

const UrlColumnInput = Input.extend<{ hasRightButton: boolean }>`
  height: 33px;
  border-top-right-radius: ${props => (props.hasRightButton ? 0 : null)};
  border-bottom-right-radius: ${props => (props.hasRightButton ? 0 : null)};
`;

const HtmlInput = styled.textarea`
  width: 100%;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  height: 250px;
  &:focus {
    outline: none;
  }
`;

interface IFunctionColumnProps {
  dir: "column" | "row";
  isLast: boolean;
}

const FunctionColumn = styled<IFunctionColumnProps, any>("div")`
  display: flex;
  flex-direction: ${props => props.dir};
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: ${props => (props.isLast ? null : "1px solid #cacaca")};
`;

const ActionColumn = styled.div``;

interface IAlignProps {
  isSelected: boolean;
}

const Align = styled<IAlignProps, any>("button")`
  background-color: #fff;
  border: none;
  padding: 5px 7px;
  margin-right: 5px;
  border-radius: 3px;
  color: #505659;
  cursor: pointer;
  transition: opacity 0.5s ease;
  opacity: ${props => (props.isSelected ? "1" : "0.2")};
  border: 0.5px solid #8f9699;
  &:hover {
    opacity: ${props => (props.isSelected ? null : "0.5")};
  }
  &:focus {
    outline: none;
  }
`;

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const Toggle = styled.input`
  display: none;
  &:focus + .slider-round {
    box-shadow: 0 0 1px #2196f3;
  }
  &:checked + .slider-round:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }
`;

interface IToggleRoundProps {
  fullWidth: boolean;
}

const ToggleRound = styled<IToggleRoundProps, any>("span")`
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  background-color: ${props => (props.fullWidth ? "#2196f3" : null)};
  box-shadow: ${props => (props.fullWidth ? "0 0 1px #2196f3" : null)};

  &::before {
    -webkit-transform: ${props =>
      props.fullWidth ? "#translateX(18px)" : null};
    -ms-transform: ${props => (props.fullWidth ? "translateX(18px)" : null)};
    transform: ${props => (props.fullWidth ? "translateX(18px)" : null)};
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 2.6px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

interface IProps {
  selectedIndex: number | number[] | null;
  selectedContent: any;
  handleOnChange: any;
  OnChangeCards: any;
  type: "WIKIIMAGE_ADD" | "WIKIIMAGE_EDIT" | "POST_ADD" | "POST_EDIT";
  onBlockOptionDownClick: any;
  buttonCallback: any;
}

class BlockOptions extends React.Component<IProps, any> {
  public showOptions = () => {
    const {
      selectedIndex,
      selectedContent,
      handleOnChange,
      OnChangeCards
    } = this.props;
    if (Array.isArray(selectedIndex) && selectedIndex.length >= 2) {
      switch (selectedContent.content) {
        case "BUTTON":
          return (
            <OptionRows>
              <Option>
                <OptionHeader>
                  <OptionTitle>BUTTON</OptionTitle>
                  <MinimizeButton>
                    <i className="fas fa-angle-up" />
                  </MinimizeButton>
                </OptionHeader>
                <FeatureColumn>
                  <FunctionColumn dir={"column"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>Button Link</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <UrlColumnInput
                        type="text"
                        value={selectedContent.link}
                        hasRightButton={false}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "BUTTON",
                            "LINK"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Background Color</FunctionTitle>
                    <Sketch
                      OnChangeCards={OnChangeCards}
                      selectedIndex={selectedIndex}
                      type="ButtonBackgroundColor"
                      color={selectedContent.backgroundColor}
                    />
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Hover Color</FunctionTitle>
                    <Sketch
                      OnChangeCards={OnChangeCards}
                      selectedIndex={selectedIndex}
                      type="ButtonHoverColor"
                      color={selectedContent.hoverColor}
                    />
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Alignments</FunctionTitle>
                    <ActionColumn>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-start")
                        }
                        isSelected={selectedContent.align === "flex-start"}
                      >
                        <i className="fas fa-align-left" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "center")
                        }
                        isSelected={
                          selectedContent.align === "center" ||
                          selectedContent.align === undefined
                        }
                      >
                        <i className="fas fa-align-center" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-end")
                        }
                        isSelected={selectedContent.align === "flex-end"}
                      >
                        <i className="fas fa-align-right" />
                      </Align>
                    </ActionColumn>
                  </FunctionColumn>
                  <FunctionColumn isLast={true}>
                    <FunctionTitle>Text Alignments</FunctionTitle>
                    <ActionColumn>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "textAlign", "left")
                        }
                        isSelected={selectedContent.textAlign === "left"}
                      >
                        <i className="fas fa-align-left" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "textAlign", "center")
                        }
                        isSelected={
                          selectedContent.textAlign === "center" ||
                          selectedContent.textAlign === undefined
                        }
                      >
                        <i className="fas fa-align-center" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "textAlign", "right")
                        }
                        isSelected={selectedContent.textAlign === "right"}
                      >
                        <i className="fas fa-align-right" />
                      </Align>
                    </ActionColumn>
                  </FunctionColumn>
                </FeatureColumn>
              </Option>
            </OptionRows>
          );
        case "HTML":
          return (
            <OptionRows>
              <Option>
                <OptionHeader>
                  <OptionTitle>HTML</OptionTitle>
                  <MinimizeButton>
                    <i className="fas fa-angle-up" />
                  </MinimizeButton>
                </OptionHeader>
                <FeatureColumn>
                  <FunctionColumn isLast={true} dir={"column"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>Html Code</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <HtmlInput
                        style={{ height: "250px" }}
                        value={selectedContent.link}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "HTML",
                            "CODE"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn>
                </FeatureColumn>
              </Option>
            </OptionRows>
          );
        case "TEXT":
          return (
            <OptionRows>
              <Option>
                <OptionHeader>
                  <OptionTitle>TEXT</OptionTitle>
                  <MinimizeButton>
                    <i className="fas fa-angle-up" />
                  </MinimizeButton>
                </OptionHeader>
                <FeatureColumn>
                  <FunctionColumn>
                    <FunctionTitle>Alignments</FunctionTitle>
                    <ActionColumn>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-start")
                        }
                        isSelected={selectedContent.align === "flex-start"}
                      >
                        <i className="fas fa-align-left" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "center")
                        }
                        isSelected={
                          selectedContent.align === "center" ||
                          selectedContent.align === undefined
                        }
                      >
                        <i className="fas fa-align-center" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-end")
                        }
                        isSelected={selectedContent.align === "flex-end"}
                      >
                        <i className="fas fa-align-right" />
                      </Align>
                    </ActionColumn>
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Text Alignments</FunctionTitle>
                    <ActionColumn>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "textAlign", "left")
                        }
                        isSelected={
                          selectedContent.textAlign === "left" ||
                          selectedContent.textAlign === undefined
                        }
                      >
                        <i className="fas fa-align-left" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "textAlign", "center")
                        }
                        isSelected={selectedContent.textAlign === "center"}
                      >
                        <i className="fas fa-align-center" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "textAlign", "right")
                        }
                        isSelected={selectedContent.textAlign === "right"}
                      >
                        <i className="fas fa-align-right" />
                      </Align>
                    </ActionColumn>
                  </FunctionColumn>
                  <MiniWiki
                    handleOnChange={handleOnChange}
                    selectedIndex={selectedIndex}
                    selectedContent={selectedContent}
                  />
                </FeatureColumn>
              </Option>
            </OptionRows>
          );
        case "IMAGE":
          return (
            <OptionRows>
              <Option>
                <OptionHeader>
                  <OptionTitle>IMAGE</OptionTitle>
                  <MinimizeButton>
                    <i className="fas fa-angle-up" />
                  </MinimizeButton>
                </OptionHeader>
                <FeatureColumn>
                  <FunctionColumn>
                    <FunctionTitleContainer style={{ width: "100%" }}>
                      <FunctionTitle>Image Upload</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <Upload
                        type="POST_IMAGE"
                        selectedIndex={selectedIndex}
                        exShownImg={{ url: selectedContent.imageSrc }}
                        handleOnChange={this.props.handleOnChange}
                      />
                    </UrlColumn>
                  </FunctionColumn>
                  <FunctionColumn dir={"column"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>Image URL</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <ImageSrc
                        type="text"
                        value={selectedContent.imageSrc}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "IMAGE",
                            "URL"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Alignments</FunctionTitle>
                    <ActionColumn>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-start")
                        }
                        isSelected={selectedContent.align === "flex-start"}
                      >
                        <i className="fas fa-align-left" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "center")
                        }
                        isSelected={
                          selectedContent.align === "center" ||
                          selectedContent.align === undefined
                        }
                      >
                        <i className="fas fa-align-center" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-end")
                        }
                        isSelected={selectedContent.align === "flex-end"}
                      >
                        <i className="fas fa-align-right" />
                      </Align>
                    </ActionColumn>
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Full Width</FunctionTitle>
                    <ActionColumn>
                      <ToggleContainer>
                        <Toggle
                          onClick={() =>
                            OnChangeCards(selectedIndex, "fullWidth", "toggle")
                          }
                          type="checkbox"
                        />
                        <ToggleRound fullWidth={selectedContent.fullWidth} />
                      </ToggleContainer>
                    </ActionColumn>
                  </FunctionColumn>
                  {/* <FunctionColumn dir={"column"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>Alternate Text</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <UrlColumnInput
                        style={{ borderRadius: "5px" }}
                        type="text"
                        value={selectedContent.alt}
                        hasRightButton={false}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "IMAGE",
                            "ALT"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn> */}
                  {/* <FunctionColumn dir={"column"} isLast={"true"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>Image Link</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <UrlColumnInput
                        type="text"
                        value={selectedContent.link}
                        hasRightButton={false}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "IMAGE",
                            "LINK"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn> */}
                  <FunctionColumn dir={"column"} isLast={"true"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>History</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      <ImageSrc
                        type="text"
                        value={selectedContent.imageSrc}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "IMAGE",
                            "URL"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn>
                </FeatureColumn>
              </Option>
            </OptionRows>
          );
        case "VIDEO":
          return (
            <OptionRows>
              <Option>
                <OptionHeader>
                  <OptionTitle>VIDEO</OptionTitle>
                  <MinimizeButton>
                    <i className="fas fa-angle-up" />
                  </MinimizeButton>
                </OptionHeader>
                <FeatureColumn>
                  <FunctionColumn dir={"column"}>
                    <FunctionTitleContainer>
                      <FunctionTitle>Video URL</FunctionTitle>
                    </FunctionTitleContainer>
                    <UrlColumn>
                      {/* <button className={styles.btn}>URL</button> */}
                      <UrlColumnInput
                        type="text"
                        value={selectedContent.videoSrc}
                        hasRightButton={false}
                        onChange={e =>
                          handleOnChange(
                            e.target.value,
                            selectedIndex,
                            "VIDEO",
                            "URL"
                          )
                        }
                      />
                    </UrlColumn>
                  </FunctionColumn>
                  <FunctionColumn>
                    <FunctionTitle>Alignments</FunctionTitle>
                    <ActionColumn>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-start")
                        }
                        isSelected={selectedContent.align === "flex-start"}
                      >
                        <i className="fas fa-align-left" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "center")
                        }
                        isSelected={
                          selectedContent.align === "center" ||
                          selectedContent.align === undefined
                        }
                      >
                        <i className="fas fa-align-center" />
                      </Align>
                      <Align
                        onClick={() =>
                          OnChangeCards(selectedIndex, "align", "flex-end")
                        }
                        isSelected={selectedContent.align === "flex-end"}
                      >
                        <i className="fas fa-align-right" />
                      </Align>
                    </ActionColumn>
                  </FunctionColumn>
                </FeatureColumn>
              </Option>
            </OptionRows>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  public render() {
    const {
      onBlockOptionDownClick,
      buttonCallback,
      selectedIndex
    } = this.props;
    return (
      <BlockOptionContainer
        isSelected={
          // this.props.selectedContent !== null ||
          this.props.selectedContent !== undefined
        }
        type={this.props.type}
      >
        <Header>
          <ButtonTitle>CONTENT</ButtonTitle>
          <ButtonColumn>
            <Button onClick={() => buttonCallback("delete", selectedIndex)}>
              <i className="fas fa-trash-alt" />
            </Button>
            <Button onClick={() => buttonCallback("duplicate", selectedIndex)}>
              <i className="fas fa-copy" />
            </Button>
            <Button onClick={() => onBlockOptionDownClick()}>
              <i className="fas fa-angle-down" />
            </Button>
          </ButtonColumn>
        </Header>
        {this.props.selectedContent ? this.showOptions() : null}
      </BlockOptionContainer>
    );
  }
}

export default BlockOptions;
