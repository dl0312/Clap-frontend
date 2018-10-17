import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryTagContainer = styled.div`
  padding: 3px 5px;
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
}

class CategoryTag extends React.Component<IProps, any> {
  public render() {
    const { id, name } = this.props;
    return (
      <Link to={`/category/read/${id}`} style={{ textDecoration: "none" }}>
        <CategoryTagContainer># {name}</CategoryTagContainer>
      </Link>
    );
  }
}

export default CategoryTag;
