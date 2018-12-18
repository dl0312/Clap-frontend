import React from "react";
import styled from "styled-components";
import { Input, Icon, Button } from "antd";
import ReactPlayer from "react-player";

const VideoModalContainer = styled.div`
  width: 500px;
  height: 100%;
`;

const VideoModalHeader = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 15px;
`;

const VideoModalUrl = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e5e5e5;
`;

const VideoModalPreview = styled.div`
  padding: 10px;
  background-color: #eee;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  justify-content: center;
`;

const EmptyVideo = styled.div``;

const VideoModalHelper = styled.div`
  text-align: center;
  padding: 20px 20px;
  font-size: 12px;
`;

const VideoModalHeaderTitle = styled.li``;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  /* Player ratio: 100 / (1280 / 720) */
`;

const CloseButton = styled(Icon)`
  transition: 0.3s ease;
  &:hover {
    transform: rotate(180deg);
  }
`;

interface IProps {
  handleSetState: any;
  handleDrop: any;
  selectedIndex: number | null;
  targetIndex: number | null;
  cards: any;
}

interface IState {
  videoUrl: string;
  videoModalState: "Empty" | "Parsing" | "Found" | "NotFound";
}

class VideoModal extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      videoUrl: "",
      videoModalState: "Empty"
    };
  }

  public handleOnChange = (e: any) => {
    if (e.target.value === "") {
      this.setState({ videoUrl: e.target.value, videoModalState: "Empty" });
    } else {
      this.setState({ videoModalState: "Parsing" });
      const findVideo = ReactPlayer.canPlay(e.target.value);
      console.log(ReactPlayer.canPlay(e.target.value));
      if (findVideo) {
        this.setState({
          videoUrl: e.target.value,
          videoModalState: "Found"
        });
      } else {
        this.setState({
          videoUrl: e.target.value,
          videoModalState: "NotFound"
        });
      }
    }
  };

  public handleOnClickSubmit = () => {
    const dragItem = {
      type: "Video",
      contents: {
        videoUrl: this.state.videoUrl,
        style: "fullWidth"
      }
    };
    console.log(this.props);
    if (this.props.targetIndex !== null) {
      this.props.handleDrop(dragItem, this.props.targetIndex);
    } else {
      if (this.props.selectedIndex !== null) {
        this.props.handleDrop(dragItem, this.props.selectedIndex + 1);
      } else {
        this.props.handleDrop(dragItem, this.props.cards.length);
      }
    }
    this.props.handleSetState("isVideoModalOpen", false);
  };

  public render() {
    const { handleSetState } = this.props;
    const { videoUrl, videoModalState } = this.state;
    return (
      <VideoModalContainer>
        <VideoModalHeader>
          <VideoModalHeaderTitle>VIDEO</VideoModalHeaderTitle>
          <CloseButton
            onClick={() => handleSetState("isVideoModalOpen", false)}
            type="close"
          />
        </VideoModalHeader>
        <VideoModalUrl>
          <Input
            prefix={
              <Icon type="youtube" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Enter Youtube URL"
            onChange={this.handleOnChange}
          />
        </VideoModalUrl>
        <VideoModalPreview>
          {videoModalState !== "Empty" ? (
            videoModalState === "Parsing" ? (
              <Icon type="loading" />
            ) : videoModalState === "Found" ? (
              <>
                <VideoContainer>
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
                </VideoContainer>
                <Button
                  onClick={() => this.handleOnClickSubmit()}
                  style={{ marginTop: 10 }}
                  type="primary"
                >
                  Submit
                </Button>
              </>
            ) : videoModalState === "NotFound" ? (
              <div>Wrong URL 😭</div>
            ) : null
          ) : (
            <EmptyVideo>You can preview the video here.</EmptyVideo>
          )}
        </VideoModalPreview>
        <VideoModalHelper>
          Privacy videos (CCTV/Black Box), libel and copyright infringement
          videos may be subject to sanctions under the terms and conditions of
          use and related laws.
          <br />
          <a
            style={{ color: "skyblue", textDecoration: "underline" }}
            href={"www.google.com"}
          >
            Video Upload Help
          </a>
        </VideoModalHelper>
      </VideoModalContainer>
    );
  }
}

export default VideoModal;
