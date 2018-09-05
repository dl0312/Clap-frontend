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

const Subtitle = styled.div`
  font-size: 15px;
  font-weight: bolder;
  padding: 5px 10px;
  border-radius: 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
`;

const WikiEditContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

const ParentOrChildrenListContainer = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
`;

const ParentOrChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 15px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const ItemCard = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CurrentImg = styled.img`
  width: 200px;
  margin: 5px;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
`;

const CurrentName = styled.div`
  margin: 5px;
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
    const {
      pos,
      name,
      // parentId,
      // childrenIds,
      // category,
      hoverImgJson,
      onImage
    } = this.state;
    console.log(this.props);
    return (
      <React.Fragment>
        <Helmet>
          <title>{`category: ${name}`}</title>
        </Helmet>
        <Query
          query={CATEGORY}
          variables={{ categoryId: this.props.match.params.categoryId }}
        >
          {({ loading, data, error }) => {
            if (loading) return "Loading...";
            if (error) return `${error.message}`;
            console.log(data);
            const { category } = data.GetCategoryById;
            return (
              <WikiEditContainer>
                <ParentOrChildrenContainer>
                  <Subtitle>PARENT</Subtitle>
                  <ParentOrChildrenListContainer>
                    {category.parent.map((parent: any, index: number) => (
                      <ItemCard key={index}>{parent.name}</ItemCard>
                    ))}
                  </ParentOrChildrenListContainer>
                </ParentOrChildrenContainer>
                <CurrentContainer>
                  <Link to={`/category/edit/${category.id}`}>
                    <button>Edit</button>
                  </Link>
                  <Mutation
                    mutation={DELETE_CATEGORY}
                    onCompleted={data => this.confirm(data)}
                  >
                    {(DeleteCategory, { data }) => (
                      <button
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
                        Delete
                      </button>
                    )}
                  </Mutation>
                  {category.wikiImages[0] ? (
                    <React.Fragment>
                      <CurrentImg
                        src={`http://localhost:4000/uploads/${
                          category.wikiImages[0].shownImage.url
                        }`}
                        alt={category.name}
                        onMouseOver={() =>
                          this.setState({
                            hoverImgJson: category.wikiImages[0].hoverImage,
                            onImage: true
                          })
                        }
                        onMouseMove={(e: React.MouseEvent<HTMLImageElement>) =>
                          this.setState({ pos: GetPos(e) })
                        }
                        onMouseOut={() => {
                          this.setState({ onImage: false });
                        }}
                      />
                    </React.Fragment>
                  ) : (
                    <CurrentImg
                      src={
                        "https://image.freepik.com/free-icon/question-mark-inside-a-box-outline_318-51427.jpg"
                      }
                    />
                  )}
                  <CurrentName>{category.name}</CurrentName>
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
                  <ImagePopup pos={pos} json={hoverImgJson} onImage={onImage} />
                </CurrentContainer>
                <ParentOrChildrenContainer>
                  <Subtitle>CHILDREN</Subtitle>
                  <ParentOrChildrenListContainer>
                    {category.children.map((child: any, index: number) => (
                      <ItemCard>{child.name}</ItemCard>
                    ))}
                  </ParentOrChildrenListContainer>
                </ParentOrChildrenContainer>
              </WikiEditContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default CategoryDetail;
