import * as React from "react";
import styled from "styled-components";
import { media } from "../../config/_mixin";
import { Carousel } from "antd";

interface ISlideImageProps {
  isSelect: boolean;
  url: string;
}

const SlideImage = styled<ISlideImageProps, any>("div")`
  position: absolute;
  z-index: 2;
  max-width: 1920px;
  min-width: 960px;
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  background-position: 50% 50%;
  background-image: linear-gradient(
      to right,
      rgb(240, 242, 245),
      transparent,
      transparent,
      transparent,
      transparent,
      transparent,
      rgb(240, 242, 245)
    ),
    url(${props => `${props.url}`});
  transition: opacity 1s ease;
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
  font-size: 30px;
  font-weight: 100;
  border: 2px solid white;
  text-transform: uppercase;
  font-weight: bolder;
  padding: 10px 15px;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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
            "https://www.pcgamesn.com/wp-content/uploads/2018/10/kda-skins-splash.jpg",
          title: "league of legend"
        },
        {
          src:
            "http://vamers.com/wp-content/uploads/2018/07/Vamers-Gaming-World-of-Warcraft-subscription-now-gives-access-to-all-previous-expansions-1.jpg",
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
        },
        {
          src:
            "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc7qyx5PC2O4ye.k1H6mGKwYqYvRrdtiZHzmPyzf_7pEjenioVBFFhnIcYN5SI7px69_2q4NrsYoxOa0uDECn.wzK.SCu0KN8H2SnAMMn4oEMWll_4YdmzsurOVkdxOm.fPhdztxo6f4TKKP61gPTLZzPU.m29FOvbVHrBy6J13TE-&h=1080&w=1920&format=jpg",
          title: "Red Dead Redemption 2"
        },
        {
          src:
            "http://gameabout.com/files/attach/images/111/010/663/001/792cb96110feee2e1f7710c1b3205f83.jpg",
          title: "Lost Ark"
        },
        {
          src: "https://pbs.twimg.com/media/Dh_cklNW4AA5brh.jpg",
          title: "Fortnite"
        }
      ]
    };
  }

  public render() {
    const { slides } = this.state;
    return (
      <>
        <Carousel autoplay={true} effect="fade">
          {slides.map((slide, index) => {
            return (
              <SlideContainer key={index}>
                <SlideImage url={slide.src} />
                <SlideText>{slide.title}</SlideText>
              </SlideContainer>
            );
          })}
        </Carousel>
      </>
    );
  }
}

export default Slide;
