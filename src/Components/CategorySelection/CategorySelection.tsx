import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import SmallCategory from "../SmallCategory";
import {
  getCategoriesByKeyword,
  getCategoriesByKeywordVariables
} from "../../types/api";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import { GetPos } from "../../Utility/GetPos";
import { LOST_IMAGE_URL } from "../../constants";
import Input from "../Input";
import Loading from "../Loading";

const ListContainer = styled.div`
  width: 100%;
  background-color: white;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  margin: 5px 0;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e5e5e5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
`;

const CategorySelectionContainer = styled.div`
  border: 1px solid #ced4da;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
  color: black;
  background-color: white;
  height: 100%;
`;

const SearchInput = styled(Input)`
  width: 100%;
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
  object-fit: fill;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
`;

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  cursor: pointer;
`;

const CategoryTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
  margin: 10px 0px;
  font-size: 15px;
  font-weight: bolder;
`;

const SelectedListContainer = styled.div`
  transition: min-height 0.5s ease;
  min-height: 30px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  border: 1px solid #ced4da;
  padding: 5px;
`;

const UpperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const UpperSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    const { type, deleteIdToState, addIdToState } = this.props;
    const { selectedCategories, keyword } = this.state;
    return (
      <CategorySelectionContainer>
        <UpperContainer>
          <UpperSelectorContainer>
            <CategoryTitle>{type}</CategoryTitle>
            <SearchInput
              type={"text"}
              value={keyword}
              onChange={this.onInputChange}
              placeholder={`Search...`}
              name={"keyword"}
            />
            <CategoriesByKeyword
              query={CATEGORIES_KEYWORD}
              variables={{ keyword }}
            >
              {({ loading, data, error }) => {
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
                return (
                  <ListContainer>
                    {data.GetCategoriesByKeyword.categories &&
                      data.GetCategoriesByKeyword.categories.map(
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
                                  src={category!.wikiImages![0]!.shownImage}
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
                                <WikiImage src={LOST_IMAGE_URL} />
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
          </UpperSelectorContainer>

          <SelectedListContainer>
            {selectedCategories.map((categoryId, index) => {
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
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default CategorySelection;
