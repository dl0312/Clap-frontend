import * as React from "react";
import styled from "styled-components";
import { getCategoryById, getCategoryByIdVariables } from "../../types/api";
import { SIMPLE_CATEGORY } from "./SmallCategoryQueries";
import { Query } from "react-apollo";

const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  margin: 2px;
`;

// const SelectedImg = styled.img`
//   width: 20px;
//   margin-right: 2px;
//   border-radius: 2px;
// `;

const SelectedTitle = styled.span`
  text-transform: uppercase;
  font-size: 10px;
  margin-right: 5px;
`;

const SelectedIcon = styled.i`
  font-size: 10px;
`;

class CategoryById extends Query<getCategoryById, getCategoryByIdVariables> {}

interface IProps {
  type: any;
  categoryId: number;
  deleteIdToState: any;
}

class SmallCategory extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { type, categoryId, deleteIdToState } = this.props;
    return (
      <CategoryById query={SIMPLE_CATEGORY} variables={{ categoryId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <div>{error.message}</div>;
          }
          if (data === undefined) {
            return <div>undefined data</div>;
          }
          const { category } = data.GetCategoryById;
          return (
            <SelectedContainer>
              <SelectedTitle>{category!.name}</SelectedTitle>
              <SelectedIcon
                className="fas fa-times"
                onClick={e => {
                  e.preventDefault();
                  deleteIdToState(type, category);
                }}
              />
            </SelectedContainer>
          );
        }}
      </CategoryById>
    );
  }
}

export default SmallCategory;
