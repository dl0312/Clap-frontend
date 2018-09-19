import React from "react";
// import styled from "styled-components";

interface IProps {
  history: any;
  match: { params: { keyword: string } };
}

interface IState {
  keyword: string;
}

class SearchResult extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keyword: ""
    };
  }
  public render() {
    return <div>{this.props.match.params.keyword}</div>;
  }
}

export default SearchResult;
