import * as React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ReactPlayer from "react-player";

const VideoContentWrapper = styled.div`
  position: static;
  display: block;
  cursor: url(https://ssl.pstatic.net/static.editor/static/dist/editor/1543468182439/img/se_cursor_drag_grab.cur),
    url(../img/se_cursor_drag_grab.png), auto;
`;

interface IVideoContainerProps {
  VideoStyle: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
  currentVideoWidth: number;
  currentVideoHeight: number;
}

const VideoContainer = styled<IVideoContainerProps, any>("div")`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  max-width: ${props =>
    props.VideoStyle === "fullWidth" ? null : `${props.currentVideoWidth}px`};
  margin-left: ${props =>
    props.VideoStyle === "alignCenter" || props.VideoStyle === "alignRight"
      ? "auto"
      : null};
  margin-right: ${props =>
    props.VideoStyle === "alignCenter" || props.VideoStyle === "alignLeft"
      ? "auto"
      : null};
  width: ${props => (props.VideoStyle === "fullWidth" ? "100%" : "66.7%")};
`;

interface IDescriptionContainerProps {
  VideoStyle: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

const DescriptionContainer = styled<IDescriptionContainerProps, any>("div")`
  position: relative;
  text-align: ${props =>
    props.VideoStyle === "fullWidth"
      ? "center"
      : props.VideoStyle === "alignLeft"
      ? "left"
      : props.VideoStyle === "alignCenter"
      ? "center"
      : props.VideoStyle === "alignRight"
      ? "right"
      : null};
`;

const Description = styled(TextareaAutosize)`
  border: none;
  resize: none;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  text-align: inherit;
  width: 100%;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  contents: IVideoContents;
}

interface IVideoContents {
  slateData?: any;
  videoUrl: string;
  description: string;
  style: "fullWidth" | "alignLeft" | "alignCenter" | "alignRight";
}

class VideoUserContent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {
      contents: { videoUrl, style, description }
    } = this.props;

    return (
      <VideoContentWrapper>
        <VideoContainer className="content" VideoStyle={style}>
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%"
            }}
          >
            <ReactPlayer
              title="react-player"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0
              }}
              url={videoUrl}
              frameBorder="0"
              allowFullScreen={true}
              youtubeConfig={{
                playerVars: { showinfo: 1 },
                preload: true
              }}
            />
          </div>
          <DescriptionContainer VideoStyle={style}>
            <Description value={description} />
          </DescriptionContainer>
          )}
        </VideoContainer>
      </VideoContentWrapper>
    );
  }
}

export default VideoUserContent;
