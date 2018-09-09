import React from "react";
import styled from "styled-components";
import { ADD_CATEGORY } from "../../sharedQueries";
import { Mutation } from "react-apollo";
import CategorySelection from "../../Components/CategorySelection";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

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
}

class CategoryAdd extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      parentIds: [],
      childrenIds: []
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
    if (data.AddCategory.ok) {
      toast.success("Log In success");
      this.props.history.push(`/category/read/${data.AddCategory.categoryId}`);
    } else {
      toast.error(data.AddCategory.error);
    }
  };

  render() {
    const { name, parentIds, childrenIds } = this.state;
    console.log(name);
    console.log(parentIds);
    console.log(childrenIds);
    return (
      <React.Fragment>
        <Helmet>
          <title>Add Category | CLAP</title>
        </Helmet>
        <Mutation
          mutation={ADD_CATEGORY}
          onCompleted={data => this.confirm(data)}
        >
          {(AddCategory, { data }) => (
            <CategoryAddContainer>
              <SearchInput
                type="text"
                onChange={e => {
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
              <SendIcon
                onClick={() =>
                  parentIds.length === 0 && childrenIds.length === 0
                    ? AddCategory({
                        variables: {
                          name
                        }
                      })
                    : parentIds.length !== 0 && childrenIds.length === 0
                      ? AddCategory({
                          variables: {
                            name,
                            parentIds
                          }
                        })
                      : parentIds.length === 0 && childrenIds.length !== 0
                        ? AddCategory({
                            variables: {
                              name,
                              childrenIds
                            }
                          })
                        : parentIds.length !== 0 && childrenIds.length !== 0
                          ? AddCategory({
                              variables: {
                                name,
                                parentIds,
                                childrenIds
                              }
                            })
                          : null
                }
              >
                Send
              </SendIcon>
            </CategoryAddContainer>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default CategoryAdd;
