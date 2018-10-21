import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ICategoryTagContainerProps {
  size: "LARGE" | "MEDIUM" | "SMALL";
}

const CategoryTagContainer = styled<ICategoryTagContainerProps, any>("div")`
  padding: ${props => {
    switch (props.size) {
      case "LARGE":
        return "3px 5px";
      case "MEDIUM":
        return "5px 10px";
      case "SMALL":
        return "3px 5px";
      default:
        return null;
        break;
    }
  }};
  background-color: white;
  color: black;
  font-weight: bolder;
  border-radius: 2px;
  font-size: 10px;
  margin-right: 4px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
`;

interface IProps {
  id: number;
  name: string;
  size: "LARGE" | "MEDIUM" | "SMALL";
}

const CategoryTag: React.SFC<IProps> = ({ id, name, size }) => (
  <Link to={`/category/read/${id}`} style={{ textDecoration: "none" }}>
    <CategoryTagContainer size={size}>{name}</CategoryTagContainer>
  </Link>
);

export default CategoryTag;
