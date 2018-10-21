import React from "react";
import Downshift from "downshift";
import styled from "styled-components";
import { Query } from "react-apollo";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import { media } from "src/config/_mixin";

// // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
// function escapeRegexCharacters(str: string) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// function renderSuggestion(suggestion: any, { query }: any) {
//   const suggestionText = `${suggestion.name}`;
//   const matches = AutosuggestHighlightMatch(suggestionText, query);
//   const parts = AutosuggestHighlightParse(suggestionText, matches);

//   return (
//     <span className={"suggestion-content " + suggestion.twitter}>
//       <span className="name">
//         {parts.map((part, index) => {
//           const className = part.highlight ? "highlight" : undefined;
//           return (
//             <span className={className} key={index}>
//               {part.text}
//             </span>
//           );
//         })}
//       </span>
//     </span>
//   );
// }

// const SuggestContainer = styled.div`
//   position: relative;
// `;

const SuggestInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 10px 10px;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  border: 1px solid #aaa;
  border-radius: 4px;
  color: black;

  ${media.tablet`margin-top: 10px;width: 100px;height: 15px; font-size: 8px;`};
  ${media.phone``};
`;

const SuggestList = styled.ul`
  color: black;
  display: block;
  position: absolute;
  top: 30px;
  width: 200px;
  border: 1px solid transparent;
  background-color: #fff;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 2;

  ${media.tablet`width: 100px; font-size: 8px;`};
  ${media.phone``};
`;

const SuggestListItem = styled.div`
  cursor: pointer;
  padding: 10px 10px;
  color: black;
`;

interface IState {
  value: string;
  suggestions: any[];
}

class AutoSuggestInput extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      suggestions: []
    };
  }

  public render() {
    const { history } = this.props;
    console.log(history);
    return (
      <Downshift
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
            {/* <label {...getLabelProps()}>Enter Categroy</label> */}
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
      </Downshift>
    );
  }
}

function ApolloAutocompleteMenu({
  selectedItem,
  highlightedIndex,
  isOpen,
  getItemProps,
  getMenuProps,
  inputValue
}: any) {
  if (!isOpen) {
    return null;
  }

  return (
    <Query
      query={CATEGORIES_KEYWORD}
      variables={{
        keyword: inputValue
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <div />;
        }

        if (error) {
          return <div>Error! ${error.message}</div>;
        }
        console.log(data);
        const categories =
          (data && data.GetCategoriesByKeyword.categories) || [];
        return (
          <SuggestList {...getMenuProps()}>
            {categories.map((item: any, index: number) => (
              <SuggestListItem
                key={item.name}
                {...getItemProps({
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? "lightgray" : "white",
                    fontWeight: selectedItem === item ? "bold" : "normal"
                  }
                })}
              >
                {item.name}
              </SuggestListItem>
            ))}
          </SuggestList>
        );
      }}
    </Query>
  );
}

export default AutoSuggestInput;
