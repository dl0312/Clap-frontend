import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Mutation } from "react-apollo";
import { ADD_WIKIIMAGE } from "../../sharedQueries";
import WikiImageEditor from "src/Components/WikiImageEditor";
import EditorDefaults from "../../EditorDefaults";

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
  match: { params: { categoryId: number } };
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

class WikiImageAdd extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      shownImage: "",
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

  public changeHoverJson = (hoverJson: any) => {
    this.setState({ hoverJson });
  };

  public confirm = async (data: any) => {
    console.log(data);
    if (data.AddWikiImage.ok) {
      toast.success("Wiki Image Add success");
      this.props.history.push(
        `/category/${this.props.match.params.categoryId}/wikiImage/read/${
          data.AddWikiImage.wikiImageId
        }`
      );
    } else if (data) {
      toast.error(data.AddWikiImage.error);
    }
  };

  public setStateWikiImageAdd = (name: string, value: any) => {
    this.setState({ [name]: value } as any);
  };

  public render() {
    return (
      <React.Fragment>
        <WikiImageAddContainer>
          <Mutation
            mutation={ADD_WIKIIMAGE}
            onCompleted={data => {
              this.confirm(data);
            }}
          >
            {(AddWikiImage, { data }) => (
              <HoverImageContainer>
                <WikiImageEditor
                  state={this.state.hoverJson}
                  type="WIKIIMAGE_ADD"
                  AddWikiImage={AddWikiImage}
                  categoryId={this.props.match.params.categoryId}
                />
              </HoverImageContainer>
            )}
          </Mutation>
        </WikiImageAddContainer>
      </React.Fragment>
    );
  }
}

export default WikiImageAdd;
