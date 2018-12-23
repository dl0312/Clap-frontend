import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import ImagePopup from "../ImagePopup";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import {
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
} from "../../types/api";
import { Tag } from "antd";

const WikiContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 0 10px;
  height: 25px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const InputTypeContainer = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 6px;
`;

interface IInputIconProps {
  small: boolean;
  isSelected: boolean;
}

const InputIcon = styled<IInputIconProps, any>("i")`
  font-size: ${props => (props.small ? "15px" : "20px")};
  transition: opacity 0.5s ease;
  opacity: ${props => (props.isSelected ? "1" : "0.2")};
  color: white;
  cursor: pointer;
  &:hover {
    opacity: ${props => (props.isSelected ? null : "0.5")};
  }
`;

const ListContainer = styled.div`
  line-height: 30px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
`;

const WikiImage = styled.img`
  height: 100%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 1px solid #d9d9d9;
`;

const DataContainer = styled.div`
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  vertical-align: top;
`;

interface IProps {
  handleOnChange: any;
  selectedIndex: number | number[] | null;
  selectedContent: any;
  activeEditorRef: any;
  gameId: number;
}

interface IState {
  keyword: string;
  hoverImgJson: string;
  pos: { x: number; y: number };
  onImage: boolean;
  inputType: string;
}

class GetCategoriesByKeywordQuery extends Query<
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
> {}

class MiniWiki extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keyword: "",
      hoverImgJson: "",
      pos: { x: 0, y: 0 },
      onImage: false,
      inputType: "MINI_IMG"
    };
  }

  public render() {
    const { gameId } = this.props;
    const { inputType, pos, hoverImgJson, onImage } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Wiki</title>
        </Helmet>
        <WikiContainer>
          <InputContainer>
            <SearchInput
              type="text"
              onChange={e => {
                this.setState({ keyword: e.target.value });
              }}
              placeholder="Category name"
            />
            <InputTypeContainer>
              <InputIcon
                onClick={() =>
                  this.setState({
                    inputType: "TEXT"
                  })
                }
                isSelected={inputType === "TEXT"}
                className="fas fa-font"
              />
              <InputIcon
                onClick={() =>
                  this.setState({
                    inputType: "MINI_IMG"
                  })
                }
                isSelected={inputType === "MINI_IMG"}
                className="fas fa-user-circle"
              />
              <InputIcon
                onClick={() =>
                  this.setState({
                    inputType: "NORMAL_IMG"
                  })
                }
                isSelected={inputType === "NORMAL_IMG"}
                className="fas fa-image"
              />
            </InputTypeContainer>
          </InputContainer>
          <GetCategoriesByKeywordQuery
            query={CATEGORIES_KEYWORD}
            variables={{ gameId, keyword: this.state.keyword }}
          >
            {({ loading, data, error }) => {
              if (loading) {
                return <div>loading</div>;
              }
              if (error) {
                return <div>{error.message}</div>;
              }
              return (
                <ListContainer>
                  {data!.GetCategoriesByKeyword.categories!.map(
                    (category: any, index: number) => (
                      <Tag
                        key={index}
                        style={{
                          padding: "0"
                        }}
                      >
                        <DataContainer
                          onClick={e => {
                            e.preventDefault();
                            console.log(this.props.activeEditorRef.current);
                            const id = category.id;
                            const type = this.state.inputType;
                            this.props.activeEditorRef.current
                              .insertInline({
                                data: { id, name, type },
                                key: JSON.stringify(id),
                                type: "clap-image",
                                isVoid: true
                              })
                              .moveToStartOfNextText()
                              .focus();
                            // this.props.handleOnChange(
                            //   change,
                            //   this.props.selectedIndex,
                            //   "slateData"
                            // );
                          }}
                        >
                          {category.topWikiImage && (
                            <WikiImage
                              src={category.topWikiImage.shownImage}
                              alt={category.name}
                            />
                          )}
                          <span style={{ padding: "0 7px" }}>
                            {category.name}
                          </span>
                        </DataContainer>
                      </Tag>
                    )
                  )}
                </ListContainer>
              );
            }}
          </GetCategoriesByKeywordQuery>
          <ImagePopup pos={pos} json={hoverImgJson} onImage={onImage} />
        </WikiContainer>
      </React.Fragment>
    );
  }
}
export default MiniWiki;
