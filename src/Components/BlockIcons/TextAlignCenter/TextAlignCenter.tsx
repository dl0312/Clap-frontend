import React from "react";
import styled from "styled-components";

interface IButtonIconProps {
  active: boolean;
}

const ButtonIcon = styled<IButtonIconProps, any>("i")`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.active ? "#00bcd4" : null)};
  cursor: pointer;
  opacity: ${props => (props.active ? "1" : "0.65")};
  transition: 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

interface IProps {
  handleOnChange: any;
  index: number;
  style: string;
  active: boolean;
}

class TextAlignCenter extends React.Component<IProps, any> {
  public render() {
    const { handleOnChange, index, style } = this.props;
    const active = style === "center";
    return (
      <div onClick={() => handleOnChange("center", index, "style")}>
        <ButtonIcon
          title={"AlignCenter"}
          active={active}
          className="fas fa-align-center"
        />
      </div>
    );
  }
}

export default TextAlignCenter;
