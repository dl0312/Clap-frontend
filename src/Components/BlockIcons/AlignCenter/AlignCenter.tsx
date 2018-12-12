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
  cursor: pointer;
  color: ${props => (props.imageStyle === "alignCenter" ? "#00bcd4" : null)};
  opacity: ${props => (props.imageStyle === "alignCenter" ? "1" : "0.65")};
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

class AlignCenter extends React.Component<IProps, any> {
  public render() {
    const {
      handleOnChange,
      index,
      contents: { style }
    } = this.props;
    return (
      <div
        title={"Align Center"}
        onClick={() => handleOnChange("alignCenter", index, "style")}
      >
        <ButtonIcon imageStyle={style} className="fas fa-align-center" />
      </div>
    );
  }
}

export default AlignCenter;
