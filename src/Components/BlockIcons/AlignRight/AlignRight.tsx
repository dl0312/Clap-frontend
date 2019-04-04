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
  contents: any;
}

class AlignRight extends React.Component<IProps, any> {
  public render() {
    const {
      handleOnChange,
      index,
      contents: { style }
    } = this.props;
    const active = style === "alignRight";
    return (
      <div onClick={() => handleOnChange("alignRight", index, "style")}>
        <ButtonIcon
          title={"AlignRight"}
          active={active}
          className="fas fa-align-right"
        />
      </div>
    );
  }
}

export default AlignRight;
