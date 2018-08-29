import * as React from "react";
import styled from "styled-components";

interface IVideoContainerProps {
  isEmpty: boolean;
}

const VideoContainer = styled<IVideoContainerProps, any>("div")`
  position: relative;
  width: 100%;
  height: ${props => (props.isEmpty ? null : "0")};
  padding-bottom: ${props => (props.isEmpty ? null : "56.25%")};
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
`;

const EmptyVideoContainer = styled.div`
  width: 100%;
  padding: 30px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

const EmptyVideoIcon = styled.i`
  font-size: 30px;
  color: #ff0000;
`;

const youtubeParser = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

interface IProps {
  src?: string | false;
}

const Video: React.SFC<IProps> = ({ src }) => {
  if (src) {
    src = youtubeParser(src);
  }
  return (
    <VideoContainer
      className="content"
      isEmpty={src === undefined || src === null || src === false}
    >
      {src ? (
        <iframe
          title="youtube"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%"
          }}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${src}?ecver=1`}
          frameBorder="0"
          allowFullScreen={true}
        />
      ) : (
        <EmptyVideoContainer>
          <EmptyVideoIcon className="fab fa-youtube" />
        </EmptyVideoContainer>
      )}
    </VideoContainer>
  );
};

export default Video;
