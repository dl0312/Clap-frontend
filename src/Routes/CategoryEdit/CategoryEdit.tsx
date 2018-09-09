import React from "react";
import styled from "styled-components";
import { CATEGORY, EDIT_CATEGORY } from "../../sharedQueries";
import { Mutation, Query } from "react-apollo";
import CategorySelection from "../../Components/CategorySelection";
import { toast } from "react-toastify";

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
`;

const SearchInput = styled.input`
  width: 200px;
  margin-bottom: 30px;
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const CategoryAddContainer = FlexBox.extend`
  width: 100%;
`;

const CategorySelectionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendIcon = styled.button``;

interface IState {
  name: string;
  parentIds: number[];
  childrenIds: number[];
  shownImgUrl: string;
  hoverImgJson: string;
  onImage: boolean;
}

class CategoryEdit extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      parentIds: [],
      childrenIds: [],
      shownImgUrl: "",
      hoverImgJson: "",
      onImage: false
    };
  }

  public addIdToState = (type: "parent" | "children", category: any) => {
    const { parentIds, childrenIds } = this.state;
    if (type === "parent") {
      const found = parentIds.includes(category.id);
      if (!found) {
        this.setState({ parentIds: parentIds.concat(category.id) });
      }
    } else if (type === "children") {
      const found = childrenIds.includes(category.id);
      if (!found) {
        this.setState({
          childrenIds: childrenIds.concat(category.id)
        });
      }
    }
  };

  deleteIdToState = (type: "parent" | "children", category: any) => {
    if (type === "parent") {
      const { parentIds } = this.state;
      const index = parentIds.findIndex(id => id === category.id);
      parentIds.splice(index, 1);
      this.setState({ parentIds });
    } else if (type === "children") {
      const { childrenIds } = this.state;
      const index = childrenIds.findIndex(id => id === category.id);
      childrenIds.splice(index, 1);
      this.setState({ childrenIds });
    }
  };

  public confirm = async (data: any) => {
    const { EditCategory } = data;
    if (EditCategory.ok) {
      toast.success("Category Edit Success");
      this.props.history.push(`/wiki`);
    } else {
      toast.error(EditCategory.error);
    }
  };

  public render() {
    const { name, parentIds, childrenIds } = this.state;
    return (
      <CategoryAddContainer>
        <Query
          query={CATEGORY}
          variables={{ categoryId: this.props.match.params.categoryId }}
          onCompleted={data => {
            const { category }: any = data.GetCategoryById;
            this.setState({
              name: category.name,
              parentIds: category.parent.map((ele: any) => {
                return ele.id;
              }),
              childrenIds: category.children.map((ele: any) => {
                return ele.id;
              })
            });
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading</div>;
            }
            if (error) {
              return <div>{error.message}</div>;
            }
            return (
              <React.Fragment>
                <SearchInput
                  type="text"
                  value={name}
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ name: e.target.value });
                  }}
                />
                <CategorySelectionsContainer>
                  <CategorySelection
                    addIdToState={this.addIdToState}
                    deleteIdToState={this.deleteIdToState}
                    selectedCategories={parentIds}
                    type="parent"
                    key="parent"
                  />
                  <CategorySelection
                    addIdToState={this.addIdToState}
                    deleteIdToState={this.deleteIdToState}
                    selectedCategories={childrenIds}
                    type="children"
                    key="children"
                  />
                </CategorySelectionsContainer>
                <Mutation
                  mutation={EDIT_CATEGORY}
                  onCompleted={data => this.confirm(data)}
                >
                  {(EditCategory, { data }) => (
                    <SendIcon
                      onClick={e => {
                        e.preventDefault();
                        EditCategory({
                          refetchQueries: [
                            {
                              query: CATEGORY,
                              variables: {
                                categoryId: this.props.match.params.categoryId
                              }
                            }
                          ],
                          variables: {
                            categoryId: this.props.match.params.categoryId,
                            parentIds,
                            childrenIds,
                            name
                          }
                        });
                      }}
                    >
                      Send
                    </SendIcon>
                  )}
                </Mutation>
              </React.Fragment>
            );
          }}
        </Query>
      </CategoryAddContainer>
    );
  }
}

export default CategoryEdit;
