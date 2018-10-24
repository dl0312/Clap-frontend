import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ICategoryTagContainerProps {
  size: "LARGE" | "MEDIUM" | "SMALL";
  isMargin?: boolean;
}

const CategoryTagContainer = styled<ICategoryTagContainerProps, any>("div")`
  padding: ${props => {
    switch (props.size) {
      case "LARGE":
        return "5px 12px 6px";
      case "MEDIUM":
        return "3px 9px 4px";
      case "SMALL":
        return "2px 6px 3px";
      default:
        return null;
        break;
    }
  }};
  background-color: white;
  color: black;
  font-weight: bolder;
  border-radius: 3px;
  font-size: 10px;
  margin-right: 4px;
  margin: ${props => (props.isMargin ? "2px" : null)};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

interface IProps {
  id: number;
  name: string;
  size: "LARGE" | "MEDIUM" | "SMALL";
  isMargin?: boolean;
}

const CategoryTag: React.SFC<IProps> = ({ id, name, size, isMargin }) => (
  <Link to={`/category/read/${id}`} style={{ textDecoration: "none" }}>
    <CategoryTagContainer isMargin={isMargin} size={size}>
      {name}
    </CategoryTagContainer>
  </Link>
);

export default CategoryTag;
