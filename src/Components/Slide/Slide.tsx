import * as React from "react";
import styled from "styled-components";
import { media } from "../../config/_mixin";

const SlideContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  z-index: 0;
  top: 0px;
  overflow: hidden;
  margin-bottom: 20px;
  padding-bottom: 40%;
`;

interface ISlideImageProps {
  isSelect: boolean;
  url: string;
}

const SlideImage = styled<ISlideImageProps, any>("div")`
  /* max-width: 1920px;
  min-width: 960px; */
  width: 100%;
  height: 100%;

  position: absolute;
  z-index: 1;
  top: 0px;
  /* filter: brightness(50%); */
  background-size: 100% auto;
  background-position: 50% 0%;
  background-image: linear-gradient(rgba(20, 20, 20, 0.3), rgba(20, 20, 20, 1)),
    url(${props => `${props.url}`});
  transition: opacity 1s ease;
  opacity: ${props => (props.isSelect ? "1" : "0")};
  animation-duration: 30s;
  animation-name: animation;
  animation-iteration-count: infinite;

  @keyframes animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  ${media.tablet`background-size: auto 100%;`};
  ${media.phone``};
`;

interface ISlideTextProps {
  isSelect: boolean;
}

const SlideText = styled<ISlideTextProps, any>("div")`
  position: absolute;
  z-index: 2;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${props => (props.isSelect ? "1" : "0")};
  font-size: 30px;
  font-weight: 100;
  border: 1px solid white;
  text-transform: uppercase;
  padding: 10px;
  color: white;
`;

interface ISlideButtonProps {
  dir: "left" | "right";
}

const SlideButton = styled<ISlideButtonProps, any>("button")`
  color: white;
  padding: 10px;
  position: absolute;
  z-index: 2;
  border: none;
  background-color: transparent;
  font-size: 25px;
  left: ${props => (props.dir === "left" ? "0px" : null)};
  right: ${props => (props.dir === "right" ? "0px" : null)};
  transition: opacity 0.5s ease;
  opacity: 0.5;
  top: 45%;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;

// const DotIndex = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   position: absolute;
//   width: 100px;
//   z-index: 2;
//   bottom: 100px;
// `;

// interface IDotProps {
//   isSelect: boolean;
// }

// const Dot = styled<IDotProps, any>("button")`
//   border-radius: 100%;
//   width: 13px;
//   height: 13px;
//   border: 1px solid white;
//   transition: background-color 0.5s ease;
//   background-color: ${props => (props.isSelect ? "white" : "transparent")};
//   outline: none;

//   &:hover {
//     background-color: white;
//   }
// `;

interface IState {
  slideNum: number;
  slides: Array<{ src: string; title: string }>;
}

class Slide extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      slideNum: 1,
      slides: [
        {
          src:
            "http://news.cdn.leagueoflegends.com/public/images/misc/Background.jpg",
          title: "league of legend"
        },
        {
          src:
            "https://mms.businesswire.com/media/20160908005460/en/543308/5/WorldofWarcraftLegion_Illidan_Art.jpg?download=1",
          title: "world of warcraft"
        },
        {
          src:
            "https://cdn-www.bluestacks.com/bs-images/battle-ground_banner.jpg",
          title: "pubg"
        },
        {
          src:
            "https://www.gtaku.net/files/attach/images/68/892/105/44e2c3d392f4016f70af8c929d53cd5f.jpg",
          title: "monster hunter world"
        },
        {
          src:
            "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/wiiu_14/SI_WiiU_TheLegendOfZeldaBreathOfTheWild.jpg",
          title: "The Legend of Zelda: Breath of the Wild"
        }
      ]
    };
  }

  public componentDidMount() {
    setInterval(() => this.imgChange("arrow", 1), 5000);
  }

  public imgChange = (type: "dot" | "arrow", imgNum: number) => {
    console.log(type);
    const MAX_SLIDE_IMAGE = this.state.slides.length;
    if (type === "dot") {
      this.setState({ slideNum: imgNum });
    } else if (type === "arrow") {
      if (imgNum === -1) {
        if (this.state.slideNum - 1 === -1) {
          this.setState({ slideNum: MAX_SLIDE_IMAGE - 1 });
        } else {
          this.setState({ slideNum: this.state.slideNum - 1 });
        }
      } else if (imgNum === 1) {
        if (this.state.slideNum + 1 === MAX_SLIDE_IMAGE) {
          this.setState({ slideNum: 0 });
        } else {
          this.setState({ slideNum: this.state.slideNum + 1 });
        }
      }
    }
  };

  public render() {
    const { slideNum, slides } = this.state;
    return (
      <React.Fragment>
        <SlideContainer>
          {slides.map((slide, index) => {
            return (
              <div key={index}>
                <SlideImage
                  url={slide.src}
                  isSelect={slideNum === index ? true : false}
                />
                <SlideText isSelect={slideNum === index ? true : false}>
                  {slide.title}
                </SlideText>
              </div>
            );
          })}
          <SlideButton onClick={() => this.imgChange("arrow", -1)} dir="left">
            <i className="fas fa-chevron-circle-left" />
          </SlideButton>
          <SlideButton onClick={() => this.imgChange("arrow", 1)} dir="right">
            <i className="fas fa-chevron-circle-right" />
          </SlideButton>
          {/* <DotIndex className="w3-display-bottommiddle">
            {slides.map((slide, index) => {
              return (
                <Dot
                  onClick={() => this.imgChange("dot", index)}
                  isSelect={slideNum === index ? true : false}
                  key={index}
                />
              );
            })}
          </DotIndex> */}
        </SlideContainer>
      </React.Fragment>
    );
  }
}

export default Slide;
