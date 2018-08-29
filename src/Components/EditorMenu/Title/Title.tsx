import * as React from "react";
import styled from "styled-components";
import { BodyContainer, NavBar, BodyColumn, Item } from "../../../sharedStyle";
import CategorySelection from "../../CategorySelection";

interface IFunctionColumn {
  dir: "column";
  isLast: boolean;
}

const FunctionColumn = styled<IFunctionColumn, any>("div")`
  display: flex;
  flex-direction: ${props => props.dir};
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: ${props => (props.isLast ? null : "1px solid #cacaca")};
`;

const FunctionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const UrlColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const UrlColumnInput = Input.extend`
  height: 33px;
`;

interface IProps {
  masterCallback: any;
  title: string;
  addIdToState: any;
  deleteIdToState: any;
  category: number[];
}

class Title extends React.Component<IProps> {
  public handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.masterCallback("Title", e.currentTarget!.value);
  };

  public render() {
    return (
      <BodyContainer>
        <NavBar>GENERAL</NavBar>
        <BodyColumn>
          <FunctionColumn dir={"column"} isLast={true}>
            <FunctionTitleContainer>
              <Item style={{ height: "20px" }}>Title</Item>
            </FunctionTitleContainer>
            <UrlColumn>
              <UrlColumnInput
                type="text"
                onChange={this.handleOnChange}
                value={this.props.title}
              />
            </UrlColumn>
          </FunctionColumn>
          <FunctionColumn dir={"column"} isLast={true}>
            {/* <Item style={{ height: "20px" }}>Category</Item> */}
            <CategorySelection
              type="CATEGORY"
              addIdToState={this.props.addIdToState}
              deleteIdToState={this.props.deleteIdToState}
              selectedCategories={this.props.category}
            />
          </FunctionColumn>
        </BodyColumn>
      </BodyContainer>
    );
  }
}

export default Title;
