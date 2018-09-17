import React from "react";
import AutoSuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import "./AutoSuggestInput.css";

const people = [
  {
    name: "League of Legend"
  },
  {
    name: "World of Warcraft"
  },
  {
    name: "PUBG"
  },
  {
    name: "Monster Hunter"
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value: any) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("\\b" + escapedValue, "i");

  return people.filter(person => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion: any) {
  return `${suggestion.name}`;
}

function renderSuggestion(suggestion: any, { query }: any) {
  const suggestionText = `${suggestion.name}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className={"suggestion-content " + suggestion.twitter}>
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : undefined;
          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}

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

  onChange = (event: any, { newValue, method }: any) => {
    const emptyRegex = /^(?!\s*$).+/;
    const emptyTest = emptyRegex.test(newValue.toLocaleLowerCase());
    if (!emptyTest) {
      this.setState({
        value: newValue
      });
      this.props.history.push(`/`);
    } else {
      newValue = newValue.trimStart();
      console.log(newValue);
      this.setState({ value: newValue });
      this.props.history.push(`/search?q=${newValue}`);
    }
  };

  onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  public render() {
    const { value, suggestions }: any = this.state;
    const inputProps = {
      placeholder: "클랩 카테고리로 검색",
      value,
      onChange: this.onChange
    };

    return (
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutoSuggestInput;
