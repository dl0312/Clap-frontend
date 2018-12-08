import React from "react";
import styled from "styled-components";

interface IButtonIconProps {
  isLinkChangeWindowOpen: boolean;
}

const ButtonIcon = styled<IButtonIconProps, any>("i")`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.isLinkChangeWindowOpen ? "#00bcd4" : null)};
  cursor: pointer;
  opacity: ${props => (props.isLinkChangeWindowOpen ? "1" : "0.65")};
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const LinkContainer = styled.div`
  width: 200px;
  height: 30px;
  top: 31px;
  left: 188px;
  right: 34px;
  z-index: 1;
  position: absolute;
  background-color: #fafafa;
  border: 1px solid #cecece;
  text-align: left;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
`;

const LinkWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

const LinkInput = styled.input`
  border: 0;
  background: 0 0;
  font-size: 12px;
  color: #555;
  width: 100%;
  height: 100%;
  margin: 0 5px;
  &:focus {
    border: none;
    outline: none;
  }
`;

const CheckButton = styled.i`
  font-size: 15px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #00bcd4;
  }
`;

interface IProps {
  handleOnChange: any;
  index: number;
  contents: any;
}

interface IState {
  isLinkChangeWindowOpen: boolean;
  targetLink: string;
}

class Link extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isLinkChangeWindowOpen: false,
      targetLink: this.props.contents.link
    };
  }

  public toggleLinkChangeWindow = () => {
    this.setState({
      isLinkChangeWindowOpen: !this.state.isLinkChangeWindowOpen
    });
  };

  public render() {
    const { handleOnChange, index } = this.props;
    const { isLinkChangeWindowOpen, targetLink } = this.state;
    return (
      <div>
        <ButtonIcon
          onClick={this.toggleLinkChangeWindow}
          isLinkChangeWindowOpen={isLinkChangeWindowOpen}
          className="fas fa-link"
        />
        {isLinkChangeWindowOpen ? (
          <LinkContainer>
            <LinkWrapper>
              <LinkInput
                type={"text"}
                value={targetLink}
                onChange={(e: any) =>
                  this.setState({ targetLink: e.target.value })
                }
              />
              <CheckButton
                onClick={() => {
                  handleOnChange(targetLink, index, "link");
                  this.toggleLinkChangeWindow();
                }}
                className="fas fa-check"
              />
            </LinkWrapper>
          </LinkContainer>
        ) : null}
      </div>
    );
  }
}

export default Link;
