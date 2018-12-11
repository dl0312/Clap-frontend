import React from "react";
import styled from "styled-components";

interface IButtonIconProps {
  imageStyle:
    | "fullWidth"
    | "alignLeft"
    | "alignCenter"
    | "alignRight"
    | "withManyTextLeft"
    | "withManyTextRight"
    | "withLessTextLeft"
    | "withLessTextRight";
}

const ButtonIcon = styled<IButtonIconProps, any>("i")`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.imageStyle === "alignLeft" ? "#00bcd4" : null)};
  cursor: pointer;
  opacity: ${props => (props.imageStyle === "alignLeft" ? "1" : "0.65")};
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

class AlignLeft extends React.Component<IProps, any> {
  public render() {
    const {
      handleOnChange,
      index,
      contents: { style }
    } = this.props;
    return (
      <div onClick={() => handleOnChange("alignLeft", index, "style")}>
        <ButtonIcon imageStyle={style} className="fas fa-align-left" />
      </div>
    );
  }
}

export default AlignLeft;