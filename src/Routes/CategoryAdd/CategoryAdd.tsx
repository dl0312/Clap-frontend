import React from "react";
import styled from "styled-components";
import { ADD_CATEGORY, CATEGORIES_KEYWORD } from "../../sharedQueries";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { Select, Form, Input, Button } from "antd";
import {
  addCategoryVariables,
  addCategory,
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
} from "src/types/api";
import Loading from "src/Components/Loading";
import FormItem from "antd/lib/form/FormItem";
// const SHOW_PARENT = TreeSelect.SHOW_PARENT;
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

class AddCategoryQuery extends Mutation<addCategory, addCategoryVariables> {}
class CategoriesByKeyword extends Query<
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
> {}

interface IProps {
  history: any;
  gameId: number;
}

interface IState {
  name: string;
  parentId: number | null;
  childrenIds: number[];
  keyword: string;
}

class CategoryAdd extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      parentId: null,
      childrenIds: [],
      keyword: ""
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
    if (data.AddCategory.ok) {
      toast.success("Category Add success");
      this.props.history.push(`/category/read/${data.AddCategory.categoryId}`);
    } else {
      toast.error(data.AddCategory.error);
    }
  };

  render() {
    const { gameId } = this.props;
    const { name, parentId, childrenIds, keyword } = this.state;
    console.log(this.state);
    return (
      <>
        <Helmet>
          <title>Add Category | CLAP</title>
        </Helmet>
        <AddCategoryQuery
          mutation={ADD_CATEGORY}
          onCompleted={data => this.confirm(data)}
        >
          {AddCategory => (
            <CategoryAddContainer>
              <Form layout={"vertical"} style={{ width: 400 }}>
                <FormItem label="Name">
                  <Input
                    onChange={e => this.setState({ name: e.target.value })}
                    placeholder={"Category Name"}
                  />
                </FormItem>

                <CategoriesByKeyword
                  query={CATEGORIES_KEYWORD}
                  variables={{ gameId, keyword }}
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
                    const categories = data.GetCategoriesByKeyword.categories;
                    return (
                      <>
                        <FormItem label="Parent">
                          <Select
                            mode="default"
                            allowClear={true}
                            showSearch={true}
                            placeholder="Please select parent category"
                            defaultValue={[]}
                            optionFilterProp="children"
                            filterOption={(input, option: any) => {
                              console.log(
                                option.props.children.props.children[1].props
                                  .children
                              );
                              return (
                                option.props.children.props.children[1].props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              );
                            }}
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
                          >
                            {categories &&
                              categories.map((category, index) => {
                                return (
                                  category && (
                                    <Option
                                      value={JSON.stringify(category.id)}
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
                                              category.topWikiImage.shownImage
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
                            defaultValue={[]}
                            onChange={(values: string[]) =>
                              this.setState({
                                childrenIds: values.map(value =>
                                  parseInt(value, 10)
                                )
                              })
                            }
                            optionFilterProp="children"
                            filterOption={(input, option: any) => {
                              console.log(
                                option.props.children.props.children[1].props
                                  .children
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
                                    <Option key={JSON.stringify(category.id)}>
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
                                              category.topWikiImage.shownImage
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
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() =>
                    parentId === null && childrenIds.length === 0
                      ? AddCategory({
                          variables: {
                            name
                          }
                        })
                      : parentId && childrenIds.length === 0
                      ? AddCategory({
                          variables: {
                            name,
                            parentId
                          }
                        })
                      : parentId === null && childrenIds.length !== 0
                      ? AddCategory({
                          variables: {
                            name,
                            childrenIds
                          }
                        })
                      : parentId && childrenIds.length !== 0
                      ? AddCategory({
                          variables: {
                            name,
                            parentId,
                            childrenIds
                          }
                        })
                      : null
                  }
                >
                  Send
                </Button>
              </Form>
            </CategoryAddContainer>
          )}
        </AddCategoryQuery>
      </>
    );
  }
}

export default CategoryAdd;
