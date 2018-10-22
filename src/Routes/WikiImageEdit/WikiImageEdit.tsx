import React from "react";
import { Mutation, Query } from "react-apollo";
import styled from "styled-components";
import { WIKIIMAGE, EDIT_WIKIIMAGE } from "../../sharedQueries";
import EditorDefaults from "../../EditorDefaults";
import { toast } from "react-toastify";
import WikiImageEditor from "src/Components/WikiImageEditor";

const WikiImageAddContainer = styled.div`
  width: 100%;
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
  shownImage: string;
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
      shownImage: "",
      hoverJson: {
        rightMenu: null,
        view: "EDIT",
        bodyBackgroundColor: EditorDefaults.BACKGROUND_COLOR,
        contentWidth: null,
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

  public confirm = (data: any) => {
    if (data.EditWikiImage.ok) {
      toast.success("Wiki Image Edit success");
      this.props.history.push(
        `/category/${this.props.match.params.categoryId}/wikiImage/read/${
          this.props.match.params.wikiImageId
        }`
      );
    } else {
      toast.error(data.EditWikiImage.error);
    }
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
                  onCompleted={data => this.confirm(data)}
                >
                  {(EditWikiImage, { data }) => (
                    <HoverImageContainer>
                      <WikiImageEditor
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
