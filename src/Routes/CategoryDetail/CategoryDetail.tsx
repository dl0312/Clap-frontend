import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_KEYWORD
} from "../../sharedQueries";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";
import { toast } from "react-toastify";
import { LOST_IMAGE_URL } from "../../constants";

const Subtitle = styled.div`
  font-size: 15px;
  font-weight: bolder;
  padding: 5px 10px;
`;

const CategoryDetailContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CategoryEditContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CategoryInfoContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  & svg {
    fill: white;
    transition: fill 0.5s ease;
  }
  &:hover {
    & svg {
      fill: green;
    }
  }
`;

const ParentOrChildrenListContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const ParentOrChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 15px;
  border: 0.5px solid white;
  align-self: flex-start;
  width: 300px;
  min-height: 250px;
`;

const ItemCard = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: darkgoldenrod;
  background-color: white;
`;

const CurrentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  align-self: flex-start;
  margin: 0 15px;
`;

const CurrentImg = styled.img`
  width: 200px;
  margin: 5px;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
`;

const CurrentName = styled.div`
  margin: 5px;
  font-size: 15px;
  font-weight: bolder;
`;

const CurrentHoverContainer = styled.div``;

interface IState {
  pos: { x: number; y: number };
  name: string;
  parentIds: number[];
  childrenIds: number[];
  shownImgUrl: string;
  hoverImgJson: string;
  onImage: boolean;
  category: string;
}

class CategoryDetail extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pos: { x: 0, y: 0 },
      name: "",
      parentIds: [],
      childrenIds: [],
      shownImgUrl: "",
      hoverImgJson: "",
      onImage: false,
      category: ""
    };
  }

  public confirm = (data: any) => {
    const { DeleteCategory } = data;
    if (DeleteCategory.ok) {
      toast.success("Category Delete Success");
      this.props.history.push(`/wiki`);
    } else {
      toast.error(DeleteCategory.error);
    }
  };

  public render() {
    const { pos, hoverImgJson, onImage } = this.state;
    console.log(this.props);
    return (
      <React.Fragment>
        <Query
          query={CATEGORY}
          fetchPolicy={"cache-and-network"}
          variables={{ categoryId: this.props.match.params.categoryId }}
        >
          {({ loading, data, error }) => {
            if (loading) return "Loading...";
            if (error) return `${error.message}`;
            console.log(data);
            const { category } = data.GetCategoryById;
            return (
              <CategoryDetailContainer>
                <Helmet>
                  <title>{`Category ${category.name} | CLAP`}</title>
                </Helmet>
                <CategoryEditContainer>
                  <Link to={`/category/edit/${category.id}`}>
                    <EditButton>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        color="white"
                      >
                        <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
                      </svg>
                    </EditButton>
                  </Link>
                  <Mutation
                    mutation={DELETE_CATEGORY}
                    onCompleted={data => this.confirm(data)}
                  >
                    {(DeleteCategory, { data }) => (
                      <EditButton
                        onClick={e => {
                          e.preventDefault();
                          DeleteCategory({
                            refetchQueries: [
                              {
                                query: CATEGORIES_KEYWORD,
                                variables: {
                                  keyword: ""
                                }
                              }
                            ],
                            variables: {
                              categoryId: category.id
                            }
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          color="white"
                        >
                          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                        </svg>
                      </EditButton>
                    )}
                  </Mutation>
                </CategoryEditContainer>
                <CategoryInfoContainer>
                  <ParentOrChildrenContainer>
                    <Subtitle>PARENT</Subtitle>
                    <ParentOrChildrenListContainer>
                      {category.parent.map((parent: any, index: number) => (
                        <ItemCard key={index}>{parent.name}</ItemCard>
                      ))}
                    </ParentOrChildrenListContainer>
                  </ParentOrChildrenContainer>
                  <CurrentContainer>
                    {category.wikiImages[0] ? (
                      <React.Fragment>
                        <CurrentImg
                          src={`category.wikiImages[0].shownImage`}
                          alt={category.name}
                          onMouseOver={() =>
                            this.setState({
                              hoverImgJson: category.wikiImages[0].hoverImage,
                              onImage: true
                            })
                          }
                          onMouseMove={(
                            e: React.MouseEvent<HTMLImageElement>
                          ) => this.setState({ pos: GetPos(e) })}
                          onMouseOut={() => {
                            this.setState({ onImage: false });
                          }}
                        />
                      </React.Fragment>
                    ) : (
                      <CurrentImg src={LOST_IMAGE_URL} />
                    )}
                    <CurrentName>{category.name}</CurrentName>

                    <ImagePopup
                      pos={pos}
                      json={hoverImgJson}
                      onImage={onImage}
                    />
                  </CurrentContainer>
                  <ParentOrChildrenContainer>
                    <Subtitle>CHILDREN</Subtitle>
                    <ParentOrChildrenListContainer>
                      {category.children.map((child: any, index: number) => (
                        <ItemCard>{child.name}</ItemCard>
                      ))}
                    </ParentOrChildrenListContainer>
                  </ParentOrChildrenContainer>
                </CategoryInfoContainer>
                <CurrentHoverContainer>
                  {category.wikiImages[0] !== undefined ? (
                    <ImagePopup
                      pos={pos}
                      follow={false}
                      json={category.wikiImages[0].hoverImage}
                      onImage={true}
                    />
                  ) : (
                    <div>no hover image</div>
                  )}
                </CurrentHoverContainer>
              </CategoryDetailContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default CategoryDetail;
