import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Query } from "react-apollo";
import { CATEGORIES_KEYWORD } from "../../sharedQueries";
import { media } from "../../config/_mixin";
import Loading from "src/Components/Loading";
import { Button, Card, Popover } from "antd";
import HoverView from "src/Components/HoverView";
import EditorDefaults from "src/EditorDefaults";

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
  width: 300px;
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
  border-radius: 6px;
  /* filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35)); */
  /* border: 1px solid rgba(0, 0, 0, 0.35); */
  transition: filter 0.5s ease;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
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
  left: 20%;
  top: 37%;
  justify-content: space-between;
  transition: opacity 0.5s ease;
  opacity: 0;
  color: white;
`;

const WikiImagesContainer = styled.div``;

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
    ${WikiImage} {
      filter: brightness(0.5);
    }
  }
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

interface IClapImageProps {
  small: boolean;
  selected: boolean;
}

const ClapImage = styled<IClapImageProps, any>("img")`
  width: ${props => (props.small ? "20px" : null)};
  margin-left: ${props => (props.small ? "2px" : null)};
  margin-right: ${props => (props.small ? "2px" : null)};
  max-width: 100%;
  max-height: 20em;
  margin-bottom: ${props => (props.small ? "-4px" : null)};
  border-radius: 4px;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`;

const ClapImageText = styled.span`
  font-weight: bolder;
  color: ${props => props.color};
  padding: 0 2px;
`;

// const ButtonContainer = FlexBox.extend`
//   flex-direction: column;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 2px 5px;
//   /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); */
//   border-radius: 100px;
//   /* background-color: white; */
//   /* color: white; */
//   font-size: 15px;
//   margin-left: 15px;
//   cursor: pointer;
//   /* border-top: 0.5px solid rgba(0, 0, 0, 0.5);
//   border-right: 0.5px solid rgba(0, 0, 0, 0.5);
//   border-bottom: 0.5px solid rgba(0, 0, 0, 0.5); */
// `;

// const ButtonIcon = styled.i`
//   transition: opacity 0.5s ease;
//   /* margin-right: 3px; */
// `;

// const CategoryOptionContainer = FlexBox.extend``;

// const CategoryInfo = styled.div`
//   margin-right: 5px;
//   font-size: 15px;
// `;

// const ButtonTitle = styled.div``;

interface IState {
  keyword: string;
}

class Wiki extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  public render() {
    return (
      <React.Fragment>
        <WikiContainer>
          <Buttons>
            <Link to={`/category/add`} style={{ textDecoration: "none" }}>
              <Button style={{ marginBottom: 10 }}>ADD CATEGORY</Button>
            </Link>
          </Buttons>
          <SearchInput
            type="text"
            placeholder={"Search Category or WikiImage"}
            onChange={e => {
              this.setState({ keyword: e.target.value });
            }}
          />
          <Query
            query={CATEGORIES_KEYWORD}
            fetchPolicy={"cache-and-network"}
            variables={{ keyword: this.state.keyword }}
          >
            {({ loading, data, error }) => {
              if (loading) return <Loading color="black" />;
              if (error) return `${error.message}`;
              return (
                <React.Fragment>
                  <Helmet>
                    <title>Wiki | CLAP</title>
                  </Helmet>
                  <ListContainer>
                    {data &&
                      data.GetCategoriesByKeyword.categories.map(
                        (category: any, index: number) => (
                          <React.Fragment key={index}>
                            <Card
                              title={
                                <Link
                                  to={`/category/read/${category.id}`}
                                  style={{
                                    textDecoration: "none"
                                  }}
                                >
                                  <CategoryName>{category.name}</CategoryName>
                                </Link>
                              }
                              // extra={
                              //   <CategoryOptionContainer>
                              //     <CategoryInfo>
                              //       <i className="far fa-images" />{" "}
                              //       {category.wikiImages.length}
                              //     </CategoryInfo>
                              //     <ButtonContainer>
                              //       <ButtonIcon className="fas fa-edit" />
                              //     </ButtonContainer>
                              //     <ButtonContainer>
                              //       <ButtonIcon className="far fa-trash-alt" />
                              //     </ButtonContainer>
                              //     <ButtonContainer>
                              //       <Link
                              //         to={`/category/${
                              //           category.id
                              //         }/wikiImage/add`}
                              //         style={{
                              //           textDecoration: "none",
                              //           display: "flex",
                              //           alignItems: "center",
                              //           justifyContent: "center",
                              //           flexDirection: "row"
                              //         }}
                              //       >
                              //         <ButtonIcon className="fas fa-plus" />
                              //       </Link>
                              //     </ButtonContainer>
                              //   </CategoryOptionContainer>
                              // }
                              style={{ width: "95%", marginBottom: 10 }}
                            >
                              {category.wikiImages.length !== 0 ? (
                                <WikiImagesContainer>
                                  {category.wikiImages.map(
                                    (wikiImage: any, index: number) => {
                                      // console.log(wikiImage);
                                      return (
                                        <React.Fragment key={index}>
                                          <WikiImageContainer>
                                            <Popover
                                              placement="rightTop"
                                              title={
                                                <>
                                                  <ClapImage
                                                    small={true}
                                                    src={wikiImage.shownImage}
                                                    alt={"hover"}
                                                  />
                                                  <ClapImageText
                                                    color={
                                                      EditorDefaults.CLAP_IMG_TEXT_COLOR
                                                    }
                                                  >
                                                    {category.name}
                                                  </ClapImageText>
                                                </>
                                              }
                                              content={
                                                wikiImage && (
                                                  <HoverView
                                                    json={JSON.parse(
                                                      wikiImage.hoverImage
                                                    )}
                                                  />
                                                )
                                              }
                                              trigger="hover"
                                            >
                                              <Link
                                                to={`/category/${
                                                  category.id
                                                }/wikiImage/read/${
                                                  wikiImage.id
                                                }`}
                                                style={{
                                                  height: "100%",
                                                  textDecoration: "none"
                                                }}
                                              >
                                                <WikiImage
                                                  src={wikiImage.shownImage}
                                                  alt={category.name}
                                                />
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
                                              </Link>
                                            </Popover>
                                          </WikiImageContainer>
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </WikiImagesContainer>
                              ) : (
                                <div>{""}</div>
                              )}
                            </Card>
                          </React.Fragment>
                        )
                      )}
                  </ListContainer>
                </React.Fragment>
              );
            }}
          </Query>
        </WikiContainer>
      </React.Fragment>
    );
  }
}
export default Wiki;
