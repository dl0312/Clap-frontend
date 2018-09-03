import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import SmallCategory from "../SmallCategory";
import {
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
} from "../../types/api";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import { GetPos } from "../../Utility/GetPos";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  margin: 5px 0;
`;

const CategorySelectionContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px;
`;

const SearchInput = styled.input`
  width: 200px;
  margin-bottom: 5px;
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const CategoryName = styled.div`
  margin-top: 5px;
  text-transform: uppercase;
  font-size: 10px;
  text-align: center;
`;

const WikiImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: scale-down;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
`;

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  cursor: pointer;
`;

const Button = styled.div`
  text-transform: uppercase;
  text-align: center;
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
`;

const SelectedListContainer = styled.div`
  transition: min-height 0.5s ease;
  min-height: 30px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid black;
  padding: 5px;
`;

const UpperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface IProps {
  selectedCategories: number[];
  type: any;
  addIdToState: any;
  deleteIdToState: any;
}

interface IState {
  keyword: string;
  hoverImgJson: string;
  selectedCategories: number[];
  onImage: boolean;
  pos: { x: number; y: number };
}

class CategoriesByKeyword extends Query<
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
> {}

class CategorySelection extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      keyword: "",
      selectedCategories: this.props.selectedCategories,
      hoverImgJson: "",
      onImage: false,
      pos: { x: 0, y: 0 }
    };
  }

  public componentWillReceiveProps = (nextProps: any) => {
    console.log(nextProps);
    this.setState({
      selectedCategories: nextProps.selectedCategories
    });
  };

  public render() {
    const { type, addIdToState, deleteIdToState } = this.props;
    const { selectedCategories, keyword } = this.state;
    console.log(selectedCategories);
    return (
      <CategorySelectionContainer>
        <Helmet>
          <title>Wiki | CLAP</title>
        </Helmet>
        <UpperContainer>
          <Button>{type}</Button>
          <SearchInput
            type="text"
            value={keyword}
            onChange={e => {
              e.preventDefault();
              this.setState({ keyword: e.target.value });
            }}
          />
          <CategoriesByKeyword
            query={CATEGORIES_KEYWORD}
            variables={{
              keyword
            }}
          >
            {({ loading, data, error }) => {
              if (loading) {
                console.log("loading");
                return <div>loading</div>;
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
              return (
                <ListContainer>
                  {data.GetCategoriesByKeyword.categories!.map(
                    (category, index) => (
                      <React.Fragment key={index}>
                        <DataContainer
                          onClick={e => {
                            e.preventDefault();
                            addIdToState(type, category);
                          }}
                        >
                          {category!.wikiImages![0] ? (
                            <WikiImage
                              src={`http://localhost:4000/uploads/${
                                category!.wikiImages![0]!.shownImage!.url
                              }`}
                              alt={category!.name}
                              onMouseOver={() =>
                                this.setState({
                                  hoverImgJson: category!.wikiImages![0]!
                                    .hoverImage,
                                  onImage: true
                                })
                              }
                              onMouseMove={(
                                e: React.MouseEvent<HTMLImageElement>
                              ) => this.setState({ pos: GetPos(e) })}
                              onMouseOut={() => {
                                this.setState({
                                  onImage: false
                                });
                              }}
                            />
                          ) : (
                            <WikiImage
                              src={
                                "https://image.freepik.com/free-icon/question-mark-inside-a-box-outline_318-51427.jpg"
                              }
                            />
                          )}
                          <CategoryName>{category!.name}</CategoryName>
                        </DataContainer>
                      </React.Fragment>
                    )
                  )}
                </ListContainer>
              );
            }}
          </CategoriesByKeyword>
          <SelectedListContainer>
            {selectedCategories.map((categoryId, index) => {
              console.log(categoryId);
              return (
                <SmallCategory
                  deleteIdToState={deleteIdToState}
                  type={type}
                  categoryId={categoryId}
                  key={index}
                />
              );
            })}
          </SelectedListContainer>
        </UpperContainer>
      </CategorySelectionContainer>
    );
  }
}

export default CategorySelection;
