import React from "react";
import styled from "../../typed-components";
import TextareaAutosize from "react-textarea-autosize";

const Container = styled(TextareaAutosize)`
  font-size: 15px;
  width: 100%;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  resize: none;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: red;
    opacity: 1; /* Firefox */
  }
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
    onKeyPress={sendMessage}
    minRows={1}
    className={className}
    onChange={onChange}
    name={name}
    required={required}
    value={value}
    placeholder={placeholder}
  />
);

function sendMessage(e: any) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}

export default Textarea;
