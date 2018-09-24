import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import { media } from "../../config/_mixin";

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WikiContainer = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 200px;
  margin-bottom: 30px;
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: white;
  color: black;
  &:focus {
    outline: none;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const WikiImage = styled.img`
  height: 100%;
  /* filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35)); */
  /* border: 1px solid rgba(0, 0, 0, 0.35); */
  transition: filter 0.5s ease;
  &:hover {
    filter: brightness(0.5) blur(0.5px);
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

const Button = styled.div`
  text-transform: uppercase;
  padding: 5px 10px;
  margin: 15px 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  transition: box-shadow 0.5s ease;
  &:hover {
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: #222; */
  color: white;
  padding: 10px 15px;
  background-color: #222;
  /* box-shadow: 0 0 1px 1px #060606, inset 0 0 0 1px #060606; */
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;

  /* border-left: 0.5px solid rgba(0, 0, 0, 0.5);
  border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5); */
`;

const CategoryName = styled.div`
  margin: 5px 0;
  text-transform: uppercase;
  font-size: 15px;
  /* color: white; */
  font-weight: bolder;
  letter-spacing: 2px;
  font-family: "Nanum Gothic";
`;

const WikiImageCountContainer = FlexBox.extend`
  position: absolute;
  z-index: 1;
  top: 40%;
  justify-content: space-between;
  transition: opacity 0.5s ease;
  opacity: 0;
  color: white;
`;

const WikiImagesContainer = styled.div`
  margin: 10px;
`;

const WikiImageContainer = FlexBox.extend`
  /* border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-left: none; */
  display: inline-flex;
  position: relative;
  z-index: 0;
  height: 150px;
  margin: 2px;
  justify-content: space-between;
  flex-direction: column;
  transition: height 0.5s ease, margin 0.5s ease;

  ${media.tablet`
    height: 100px;
    margin: 2px;
  `} ${media.phone`
    height: 75px;
    margin: 1px;
  `}
  /* border: 0.5px solid rgba(0, 0, 0, 0.2); */
  /* filter: drop-shadow(0px 0px 5px #222); */
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  &:hover {
    ${WikiImageCountContainer} {
      opacity: 1;
    }
  }
`;

const DataContainer = styled.div`
  white-space: normal;
  /* padding: 10px 20px; */
  /* padding-bottom: 20px; */
  background-color: black;
  transition: padding 0.5s ease;
  width: 95%;
  margin-bottom: 20px;
  box-shadow: 0 0 1px 1px #060606, inset 0 0 0 1px #060606;
  border: 1px solid #1a1a1a;
  border-radius: 5px;
  ${media.tablet`
    padding: 10px 3px;
    margin-bottom: 10px;
  `};
  ${media.phone`
    padding: 5px 1px;
    margin-bottom: 5px;
  `};
`;

const WikiImageCount = FlexBox.extend`
  padding: 2px 5px;
  font-size: 20px;
  /* box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5); */
  text-shadow: 0 0 5px rgba(0, 0, 0, 1);
`;

const WikiImageCountIcon = styled.i`
  margin-right: 5px;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 1);
`;

const ButtonContainer = FlexBox.extend`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 5px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); */
  border-radius: 100px;
  /* background-color: white; */
  /* color: white; */
  font-size: 15px;
  margin-right: 3px;
  /* border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5); */
`;

const ButtonIcon = styled.i`
  transition: opacity 0.5s ease;
  /* margin-right: 3px; */
`;

const CategoryOptionContainer = FlexBox.extend``;

const CategoryInfo = styled.div`
  margin-right: 5px;
  font-size: 15px;
`;

// const ButtonTitle = styled.div``;

interface IState {
  keyword: string;
  hoverImgJson: string;
  onImage: boolean;
  pos: { x: number; y: number };
}

class Wiki extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyword: "",
      hoverImgJson: "",
      onImage: false,
      pos: { x: 0, y: 0 }
    };
  }

  public render() {
    const { pos, hoverImgJson, onImage } = this.state;
    return (
      <React.Fragment>
        <WikiContainer>
          <Buttons>
            <Link to={`/category/add`} style={{ textDecoration: "none" }}>
              <Button>add category</Button>
            </Link>
          </Buttons>
          <SearchInput
            type="text"
            onChange={e => {
              this.setState({ keyword: e.target.value });
            }}
          />
          <Query
            query={CATEGORIES_KEYWORD}
            variables={{ keyword: this.state.keyword }}
          >
            {({ loading, data, error }) => {
              if (loading) return "loading";
              if (error) return `${error.message}`;
              return (
                <React.Fragment>
                  <Helmet>
                    <title>Wiki | CLAP</title>
                  </Helmet>
                  <ListContainer>
                    {data.GetCategoriesByKeyword.categories &&
                      data.GetCategoriesByKeyword.categories.map(
                        (category: any, index: number) => (
                          <React.Fragment key={index}>
                            <DataContainer>
                              <CategoryContainer>
                                <Link
                                  to={`/category/read/${category.id}`}
                                  style={{
                                    textDecoration: "none"
                                  }}
                                >
                                  <CategoryName>{category.name}</CategoryName>
                                </Link>
                                <CategoryOptionContainer>
                                  <CategoryInfo>
                                    <i className="far fa-images" />{" "}
                                    {category.wikiImages.length}
                                  </CategoryInfo>
                                  {/* <i className="far fa-edit" />
                                <i className="far fa-trash-alt" /> */}
                                  <ButtonContainer>
                                    <ButtonIcon className="fas fa-edit" />
                                  </ButtonContainer>
                                  <ButtonContainer>
                                    <ButtonIcon className="far fa-trash-alt" />
                                  </ButtonContainer>
                                  <ButtonContainer>
                                    <Link
                                      to={`/category/${
                                        category.id
                                      }/wikiImage/add`}
                                      style={{
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row"
                                      }}
                                    >
                                      <ButtonIcon className="fas fa-plus" />
                                    </Link>
                                  </ButtonContainer>
                                </CategoryOptionContainer>
                              </CategoryContainer>
                              {category.wikiImages.length !== 0 ? (
                                <WikiImagesContainer>
                                  {category.wikiImages.map(
                                    (wikiImage: any, index: number) => {
                                      // console.log(wikiImage);
                                      return (
                                        <React.Fragment key={index}>
                                          <WikiImageContainer>
                                            <Link
                                              to={`/category/${
                                                category.id
                                              }/wikiImage/read/${wikiImage.id}`}
                                              style={{
                                                height: "100%",
                                                textDecoration: "none"
                                              }}
                                            >
                                              <WikiImage
                                                src={`http://localhost:4000/uploads/${
                                                  wikiImage.shownImage
                                                }`}
                                                alt={category.name}
                                                onMouseOver={() =>
                                                  this.setState({
                                                    hoverImgJson:
                                                      wikiImage.hoverImage,
                                                    onImage: true
                                                  })
                                                }
                                                onMouseMove={(
                                                  e: React.MouseEvent<
                                                    HTMLImageElement
                                                  >
                                                ) =>
                                                  this.setState({
                                                    pos: GetPos(e)
                                                  })
                                                }
                                                onMouseOut={() => {
                                                  this.setState({
                                                    onImage: false
                                                  });
                                                }}
                                              />
                                            </Link>
                                            <WikiImageCountContainer>
                                              <WikiImageCount>
                                                <WikiImageCountIcon className="fas fa-heart" />
                                                {wikiImage.clapsCount}
                                              </WikiImageCount>
                                              <WikiImageCount>
                                                <WikiImageCountIcon className="fas fa-pencil-alt" />
                                                {wikiImage.postsCount}
                                              </WikiImageCount>
                                            </WikiImageCountContainer>
                                          </WikiImageContainer>
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </WikiImagesContainer>
                              ) : (
                                <div>{""}</div>
                              )}
                            </DataContainer>
                          </React.Fragment>
                        )
                      )}
                  </ListContainer>
                </React.Fragment>
              );
            }}
          </Query>
          <ImagePopup pos={pos} json={hoverImgJson!} onImage={onImage} />
        </WikiContainer>
      </React.Fragment>
    );
  }
}
export default Wiki;
