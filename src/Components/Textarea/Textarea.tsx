import React from "react";
import styled from "../../typed-components";
import TextareaAutosize from "react-textarea-autosize";

const Container = styled(TextareaAutosize)`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 15px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
`;

interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  name?: string;
  onChange: any;
  className?: string;
}

const Textarea: React.SFC<IProps> = ({
  placeholder = "",
  required = true,
  value,
  name = "",
  onChange,
  className
}) => (
  <Container
    className={className}
    onChange={onChange}
    name={name}
    required={required}
    value={value}
    placeholder={placeholder}
  />
);

export default Textarea;
