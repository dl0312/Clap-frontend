import * as React from "react";
import styled from "styled-components";
import { getCategoryById, getCategoryByIdVariables } from "../../types/api";
import { CATEGORY } from "../../sharedQueries";
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
    console.log(this.props);
    return (
      <CategoryById query={CATEGORY} variables={{ categoryId }}>
        {({ loading, error, data }) => {
          if (loading) {
            console.log("loading");
            return <p>Loading...</p>;
          }
          if (error) {
            console.log("error");
            return <div>{error.message}</div>;
          }
          if (data === undefined) {
            console.log("undefined");
            return <div>undefined data</div>;
          }
          console.log(data);
          const { category } = data.GetCategoryById;
          if (category === null) {
            return <div>error</div>;
          }
          return (
            <SelectedContainer>
              <SelectedTitle>{category.name}</SelectedTitle>
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
