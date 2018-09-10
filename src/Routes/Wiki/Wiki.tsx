import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";

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
  &:focus {
    outline: none;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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
  justify-content: center;
  height: 100%;
  /* border-left: 0.5px solid rgba(0, 0, 0, 0.5);
  border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5); */
`;

const CategoryName = styled.div`
  margin: 5px 0;
  text-transform: uppercase;
  font-size: 15px;
  color: white;
  padding: 5px 10px;
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

const WikiImageContainer = FlexBox.extend`
  /* border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-left: none; */
  display: inline-flex;
  position: relative;
  z-index: 0;
  height: 150px;
  margin: 5px;
  justify-content: space-between;
  flex-direction: column;
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
  white-space: pre-wrap;
  padding: 10px;
  background-color: black;
`;

const WikiImageCount = FlexBox.extend`
  padding: 2px 5px;
  font-size: 20px;
  /* box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5); */
  text-shadow: 0 0 5px rgba(0, 0, 0, 1);
`;

const WikiImageCountIcon = styled.i`
  margin-right: 5px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 1);
`;

const NoWikiImageContainer = FlexBox.extend`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  /* border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5); */
`;

const NoWikiImageIcon = styled.i`
  font-size: 25px;
  opacity: 0.5;
  transition: opacity 0.5s ease;
  &:hover {
    opacity: 1;
  }
`;

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
                    {data.GetCategoriesByKeyword.categories.map(
                      (category: any, index: number) => (
                        <React.Fragment key={index}>
                          <CategoryContainer>
                            <Link
                              to={`/category/read/${category.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <CategoryName>
                                {category.parent[0] !== undefined
                                  ? `${category.parent[0].name} `
                                  : null}
                                {category.name}
                              </CategoryName>
                            </Link>
                          </CategoryContainer>
                          <NoWikiImageContainer>
                            <Link
                              to={`/category/${category.id}/wikiImage/add`}
                              style={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column"
                              }}
                            >
                              <NoWikiImageIcon className="fas fa-plus-circle" />
                            </Link>
                          </NoWikiImageContainer>
                          {category.wikiImages.length !== 0 ? (
                            <DataContainer>
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
                                              wikiImage.shownImage.url
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
                                              this.setState({ pos: GetPos(e) })
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
                            </DataContainer>
                          ) : (
                            <div>h</div>
                            // <NoWikiImageContainer>
                            //   <Link
                            //     to={`/category/${category.id}/wikiImage/add`}
                            //     style={{
                            //       textDecoration: "none",
                            //       display: "flex",
                            //       alignItems: "center",
                            //       justifyContent: "center",
                            //       flexDirection: "column"
                            //     }}
                            //   >
                            //     <NoWikiImageIcon className="fas fa-plus-circle" />
                            //   </Link>
                            // </NoWikiImageContainer>
                          )}
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
