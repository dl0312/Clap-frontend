import React from "react";
import { Query } from "react-apollo";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import { Select } from "antd";
import {
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
} from "src/types/api";

const Option = Select.Option;

class CategoriesByKeyword extends Query<
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
> {}

interface IProps {
  history: any;
  gameId: number;
}

interface IState {
  categoryId: number | null;
  suggestions: any[];
}

class AutoSuggestInput extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      categoryId: null,
      suggestions: []
    };
  }

  public render() {
    const { history, gameId } = this.props;
    return (
      <CategoriesByKeyword
        query={CATEGORIES_KEYWORD}
        variables={{ gameId, keyword: "" }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <Select
                mode="default"
                allowClear={true}
                showSearch={true}
                placeholder="Clap Category"
                style={{ width: 250 }}
              />
            );
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
              <Select
                mode="default"
                allowClear={true}
                showSearch={true}
                placeholder="Clap Category"
                defaultValue={[]}
                optionFilterProp="children"
                style={{ width: 250 }}
                filterOption={(input, option: any) => {
                  console.log(
                    option.props.children.props.children[1].props.children
                  );
                  return (
                    option.props.children.props.children[1].props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  );
                }}
                onChange={(value: string) => {
                  console.log(value);
                  this.props.history.push({
                    pathname: `/search/${value}`,
                    state: {
                      prevLocation: history.location.pathname
                    }
                  });
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
                                src={category.topWikiImage.shownImage}
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
            </>
          );
        }}
      </CategoriesByKeyword>
    );
    {
      /* <Downshift
        onChange={selectedItem => {
          console.log(selectedItem);
          this.props.history.push({
            pathname: `/search/${selectedItem.id}`,
            state: {
              prevLocation: history.location.pathname
            }
          });
        }}
        itemToString={item => (item ? item.name : "")}
      >
        {({
          inputValue,
          getInputProps,
          getMenuProps,
          getItemProps,
          selectedItem,
          highlightedIndex,
          isOpen
        }) => (
          <div style={{ position: "relative" }}>
            <label {...getLabelProps()}>Enter Categroy</label> 
            <SuggestInput placeholder={"CLAP CATEGORY"} {...getInputProps()} />
            <ApolloAutocompleteMenu
              {...{
                inputValue,
                getMenuProps,
                getItemProps,
                selectedItem,
                highlightedIndex,
                isOpen
              }}
            />
          </div>
        )}
      </Downshift> */
    }
  }
}

// function ApolloAutocompleteMenu({
//   selectedItem,
//   highlightedIndex,
//   isOpen,
//   getItemProps,
//   getMenuProps,
//   inputValue
// }: any) {
//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <Query
//       query={CATEGORIES_KEYWORD}
//       variables={{
//         keyword: inputValue
//       }}
//     >
//       {({ loading, error, data }) => {
//         if (loading) {
//           return <div />;
//         }

//         if (error) {
//           return <div>Error! ${error.message}</div>;
//         }
//         console.log(data);
//         const categories =
//           (data && data.GetCategoriesByKeyword.categories) || [];
//         return (
//           <SuggestList {...getMenuProps()}>
//             {categories.map((item: any, index: number) => (
//               <SuggestListItem
//                 key={item.name}
//                 {...getItemProps({
//                   index,
//                   item,
//                   style: {
//                     backgroundColor:
//                       highlightedIndex === index ? "lightgray" : "white",
//                     fontWeight: selectedItem === item ? "bold" : "normal"
//                   }
//                 })}
//               >
//                 {item.name}
//               </SuggestListItem>
//             ))}
//           </SuggestList>
//         );
//       }}
//     </Query>
//   );
// }

export default AutoSuggestInput;
