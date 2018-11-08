import React from "react";
import styled from "styled-components";
import {
  CATEGORY,
  EDIT_CATEGORY,
  CATEGORIES_KEYWORD
} from "../../sharedQueries";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import Helmet from "react-helmet";
import { Form, Input, Select, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import {
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables,
  editCategoryVariables,
  editCategory,
  getCategoryById,
  getCategoryByIdVariables
} from "src/types/api";
import Loading from "src/Components/Loading";
const Option = Select.Option;

const CategoryAddContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

class GetCategoryByIdQuery extends Query<
  getCategoryById,
  getCategoryByIdVariables
> {}
class EditCategoryQuery extends Mutation<editCategory, editCategoryVariables> {}
class CategoriesByKeyword extends Query<
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
> {}

interface IState {
  name: string;
  parentId: number | null;
  parent: any;
  childrenIds: number[];
  children: any;
  shownImgUrl: string;
  hoverImgJson: string;
  onImage: boolean;
}

class CategoryEdit extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      parentId: null,
      parent: null,
      childrenIds: [],
      children: null,
      shownImgUrl: "",
      hoverImgJson: "",
      onImage: false
    };
  }

  public addIdToState = (type: "parent" | "children", category: any) => {
    const { parentId, childrenIds } = this.state;
    if (type === "parent") {
      const found = parentId === category.id;
      if (!found) {
        this.setState({ parentId });
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
      this.setState({ parentId: null });
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
    const { name, parentId, childrenIds } = this.state;
    console.log(this.state);
    return (
      <>
        <Helmet>
          <title>Edit Category | CLAP</title>
        </Helmet>
        <CategoryAddContainer>
          <GetCategoryByIdQuery
            query={CATEGORY}
            fetchPolicy={"cache-and-network"}
            variables={{ categoryId: this.props.match.params.categoryId }}
            onCompleted={(data: any) => {
              const { category }: any = data.GetCategoryById;
              console.log(data);
              this.setState({
                name: category.name,
                parentId: category.parent && category.parent.id,
                childrenIds: category.children.map((ele: any) => {
                  return ele.id;
                })
              });
            }}
          >
            {({ loading, error, data }: any) => {
              if (loading) {
                return <div>Loading</div>;
              }
              if (error) {
                return <div>{error.message}</div>;
              }
              return (
                <React.Fragment>
                  <Form layout={"vertical"} style={{ width: 400 }}>
                    <FormItem label="Name">
                      <Input
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                        placeholder={"Category Name"}
                      />
                    </FormItem>
                    <CategoriesByKeyword
                      query={CATEGORIES_KEYWORD}
                      variables={{ keyword: "" }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) {
                          return <Loading color="#000" />;
                        }
                        if (error) {
                          console.log("error");
                          return <div>{error.message}</div>;
                        }
                        if (data === undefined || data === null) {
                          console.log("undefined");
                          return <div>undefined data</div>;
                        }
                        console.log(data);
                        const categories =
                          data.GetCategoriesByKeyword.categories;
                        return (
                          <>
                            <FormItem label="Parent">
                              <Select
                                mode="default"
                                allowClear={true}
                                showSearch={true}
                                placeholder="Please select parent category"
                                onChange={(value: string) => {
                                  if (value !== undefined) {
                                    this.setState({
                                      parentId: parseInt(value, 10)
                                    });
                                  } else {
                                    this.setState({
                                      parentId: null
                                    });
                                  }
                                }}
                                value={
                                  this.state.parentId !== null
                                    ? JSON.stringify(this.state.parentId)
                                    : []
                                }
                                optionFilterProp="children"
                                filterOption={(input, option: any) => {
                                  console.log(
                                    option.props.children.props.children[1]
                                      .props.children
                                  );
                                  return (
                                    option.props.children.props.children[1].props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                              >
                                {categories &&
                                  categories.map((category, index) => {
                                    return (
                                      category && (
                                        <Option
                                          key={JSON.stringify(category.id)}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              alignItems: "center",
                                              verticalAlign: "top"
                                            }}
                                          >
                                            {category.topWikiImage && (
                                              <img
                                                style={{
                                                  height: "20px",
                                                  borderRadius: 4
                                                }}
                                                src={
                                                  category.topWikiImage
                                                    .shownImage
                                                }
                                              />
                                            )}
                                            <span style={{ padding: "0 7px" }}>
                                              {category.name}
                                            </span>
                                          </span>
                                        </Option>
                                      )
                                    );
                                  })}
                              </Select>
                            </FormItem>
                            <FormItem label="Children">
                              <Select
                                mode="multiple"
                                allowClear={true}
                                showSearch={true}
                                placeholder="Please select children categories"
                                onChange={(values: any) => {
                                  console.log(values);
                                  this.setState({
                                    childrenIds: values.map((value: any) =>
                                      parseInt(value, 10)
                                    )
                                  });
                                }}
                                // onSelect={(value: any, option) => {
                                //   console.log(value, option);
                                //   this.setState({
                                //     childrenIds: [
                                //       ...this.state.childrenIds,
                                //       parseInt(value, 10)
                                //     ]
                                //   });
                                // }}
                                // onDeselect={(value: any) => {
                                //   const index = childrenIds.findIndex(
                                //     id => id === parseInt(value, 10)
                                //   );
                                //   childrenIds.splice(index, 1);
                                //   this.setState({
                                //     childrenIds
                                //   });
                                // }}
                                value={this.state.childrenIds.map(
                                  (childId: any) => {
                                    return JSON.stringify(childId);
                                  }
                                )}
                                optionFilterProp="children"
                                filterOption={(input, option: any) => {
                                  console.log(
                                    option.props.children.props.children[1]
                                      .props.children
                                  );
                                  return (
                                    option.props.children.props.children[1].props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                              >
                                {categories &&
                                  categories.map((category, index) => {
                                    return (
                                      category && (
                                        <Option
                                          key={JSON.stringify(category.id)}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              alignItems: "center",
                                              verticalAlign: "top"
                                            }}
                                          >
                                            {category.topWikiImage && (
                                              <img
                                                style={{
                                                  height: "20px",
                                                  borderRadius: 4
                                                }}
                                                src={
                                                  category.topWikiImage
                                                    .shownImage
                                                }
                                              />
                                            )}
                                            <span style={{ padding: "0 7px" }}>
                                              {category.name}
                                            </span>
                                          </span>
                                        </Option>
                                      )
                                    );
                                  })}
                              </Select>
                            </FormItem>
                          </>
                        );
                      }}
                    </CategoriesByKeyword>

                    <EditCategoryQuery
                      mutation={EDIT_CATEGORY}
                      onCompleted={data => this.confirm(data)}
                    >
                      {(EditCategory, { data }) => (
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          onClick={(e: any) => {
                            e.preventDefault();
                            EditCategory({
                              refetchQueries: [
                                {
                                  query: CATEGORY,
                                  variables: {
                                    categoryId: this.props.match.params
                                      .categoryId
                                  }
                                }
                              ],
                              variables: {
                                categoryId: this.props.match.params.categoryId,
                                parentId,
                                childrenIds,
                                name
                              }
                            });
                          }}
                        >
                          Send
                        </Button>
                      )}
                    </EditCategoryQuery>
                  </Form>
                </React.Fragment>
              );
            }}
          </GetCategoryByIdQuery>
        </CategoryAddContainer>
      </>
    );
  }
}

export default CategoryEdit;
