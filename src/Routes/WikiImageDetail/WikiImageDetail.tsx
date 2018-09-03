import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import {
  WIKIIMAGE,
  DELETE_WIKIIMAGE,
  CATEGORIES_KEYWORD
} from "../../sharedQueries";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import ImagePopup from "../../Components/ImagePopup";
import { GetPos } from "../../Utility/GetPos";

const WikiEditContainer = styled.div`
  width: 100%;
  padding: 20px;
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

interface IProps {
  history: any;
  match: { params: { wikiImageId: number; categoryId: number } };
}

interface IState {
  pos: { x: number; y: number };
  name: string;
  shownImgUrl: string;
  hoverImgJson: string;
  onImage: boolean;
  category: any;
}

class WikiImageDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      pos: { x: 0, y: 0 },
      name: "",
      shownImgUrl: "",
      hoverImgJson: "",
      onImage: false,
      category: null
    };
  }

  render() {
    const { pos, hoverImgJson, onImage } = this.state;
    return (
      <React.Fragment>
        <Query
          query={WIKIIMAGE}
          variables={{ wikiImageId: this.props.match.params.wikiImageId }}
        >
          {({ loading, data, error }) => {
            if (loading) return "Loading...";
            if (error) return `${error.message}`;
            console.log(data);
            const { wikiImage } = data.GetWikiImageById;
            return (
              <WikiEditContainer>
                <Helmet>
                  <title>{`WikiImage: ${wikiImage.id}`}</title>
                </Helmet>
                <CurrentContainer>
                  <Link
                    to={`/category/${
                      this.props.match.params.categoryId
                    }/wikiImage/edit/${wikiImage.id}`}
                  >
                    <button>Edit</button>
                  </Link>
                  <Mutation
                    mutation={DELETE_WIKIIMAGE}
                    onCompleted={() => this.props.history.push(`/wiki`)}
                  >
                    {(DeleteWikiImage, { data }) => (
                      <button
                        onClick={e => {
                          e.preventDefault();
                          DeleteWikiImage({
                            refetchQueries: [
                              {
                                query: CATEGORIES_KEYWORD,
                                variables: {
                                  keyword: ""
                                }
                              }
                            ],
                            variables: {
                              wikiImageId: wikiImage.id
                            }
                          });
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </Mutation>

                  {wikiImage ? (
                    <React.Fragment>
                      <CurrentImg
                        src={`http://localhost:4000/uploads/${
                          wikiImage.shownImage.url
                        }`}
                        alt={wikiImage.name}
                        onMouseOver={() =>
                          this.setState({
                            hoverImgJson: wikiImage.hoverImage,
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
                  <CurrentName>{wikiImage.name}</CurrentName>
                  <CurrentHoverContainer>
                    {wikiImage !== undefined ? (
                      <ImagePopup
                        pos={pos}
                        follow={false}
                        json={wikiImage.hoverImage}
                        onImage={true}
                      />
                    ) : (
                      <div>no hover image</div>
                    )}
                  </CurrentHoverContainer>
                  <ImagePopup pos={pos} json={hoverImgJson} onImage={onImage} />
                </CurrentContainer>
              </WikiEditContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default WikiImageDetail;
