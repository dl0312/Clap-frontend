import React from "react";
import { Mutation, Query } from "react-apollo";
import styled from "styled-components";
import Editor from "../../Components/Editor";
import { WIKIIMAGE, EDIT_WIKIIMAGE } from "../../sharedQueries";
import EditorDefaults from "../../EditorDefaults";

const WikiImageAddContainer = styled.div`
  width: 100%;
  padding: 30px;
`;

const HoverImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface IProps {
  history: any;
  match: { params: { wikiImageId: number; categoryId: number } };
}

interface IState {
  imgSrc: string;
  selectedFile: any;
  hoverJson: {
    rightMenu: number | null;
    view: "EDIT" | "USER" | "JSON";
    bodyBackgroundColor: { r: number; g: number; b: number; a: number };
    contentWidth: number | null;
    font: string;
    selectedIndex: number | null;
    hoveredIndex: number | number[] | null;
    selectedContent: any;
    hoverImgJson: {
      cards: any[];
      color: { r: string; g: string; b: string; a: string };
      contentWidth: number;
      font: string;
    } | null;
    onImage: boolean;
    pos: { x: number; y: number };
    title: string;
    category: number[];
    cards: any[];
  };
}

class WikiImageEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      imgSrc: "",
      selectedFile: null,
      hoverJson: {
        rightMenu: null,
        view: "EDIT",
        bodyBackgroundColor: EditorDefaults.BACKGROUND_COLOR,
        contentWidth: EditorDefaults.WIDTH,
        font: EditorDefaults.FONT,
        selectedIndex: null,
        hoveredIndex: null,
        selectedContent: null,
        hoverImgJson: null,
        onImage: false,
        pos: { x: 0, y: 0 },
        title: "",
        category: [],
        cards: []
      }
    };
  }

  changeHoverJson = (hoverJson: any) => {
    this.setState({ hoverJson });
  };

  render() {
    return (
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
            <React.Fragment>
              <WikiImageAddContainer>
                <Mutation
                  mutation={EDIT_WIKIIMAGE}
                  onCompleted={data => this.props.history.push(`/wiki`)}
                >
                  {(EditWikiImage, { data }) => (
                    <HoverImageContainer>
                      <Editor
                        wikiImage={wikiImage}
                        state={JSON.parse(wikiImage.hoverImage)}
                        type="WIKIIMAGE_EDIT"
                        EditWikiImage={EditWikiImage}
                        categoryId={this.props.match.params.categoryId}
                      />
                    </HoverImageContainer>
                  )}
                </Mutation>
              </WikiImageAddContainer>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default WikiImageEdit;
