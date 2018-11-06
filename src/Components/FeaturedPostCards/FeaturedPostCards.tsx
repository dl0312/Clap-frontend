import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "../../config/_mixin";
import { LOST_IMAGE_URL } from "../../constants";
import CategoryTag from "../CategoryTag";

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 50px 0px; */
  font-family: "Open Sans", sans-serif;
`;

const BoardOneContainer = styled.div`
  width: 100%;
  padding: 5px 0px;
  background-color: background-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5); */
`;

const FeaturedContainer = styled.div`
  width: 100%;
`;

const FeaturedCardButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturedCardType = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;

const FeaturedButtonContainer = styled.div`
  width: 100%;
  padding: 0 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;
const FeaturedCardCounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

interface IFeaturedCardContainerProps {
  newGuideCounter: number;
}

const FeaturedCardContainer = styled<IFeaturedCardContainerProps, any>("div")`
  white-space: nowrap;
  width: 100%;
  display: block;
  transition: transform 1s ease;
  transform: ${props =>
    `translate3d(${props.newGuideCounter * -100}%, 0px, 0px)`};
`;

interface IFeaturedCardCounterProps {
  isSelected: boolean;
}

const FeaturedCardCounter = styled<IFeaturedCardCounterProps, any>("div")`
  margin: 0 1px;
  opacity: ${props => (props.isSelected ? "1" : "0.5")};
  transition: opacity 0.25s ease;
`;

interface ICardImageProps {
  url: string;
  pos: number;
}

const CardImage = styled<ICardImageProps, any>("div")`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
    url(${props => `${props.url}`});
  background-size: ${props => (props.pos ? "100%" : "100%")};
  background-position: ${props =>
    props.pos === null ? `50% 50%` : `50% ${props.pos}%`};
  background-repeat: no-repeat;
  height: 10em;
  width: 100%;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  transition: background-size 0.2s ease;
`;

const CardContainer = styled.div`
  width: 20%;
  padding: 0 2px;
  display: inline-flex;
  transition: width 0.5s ease;
  ${media.giant`width: 25%;`}
  ${media.desktop`width: 33.33%;`}
  ${media.tablet`width: 50%;`};
  ${media.phone`width: 100%;`};
`;

const Slider = styled.div`
  position: relative;
  margin: 0;
  padding: 0 4%;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
`;

const SlideHandle = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 20;
  width: 4%;
  text-align: center;
  justify-content: center;
  display: flex;
  background-color: transparent;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SlideIcon = styled.i`
  transform-origin: 55% 50%;
  height: auto;
  align-self: center;
  font-size: 2.5vw;
  color: white;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  position: relative;
  top: 5px;
  left: 5px;
`;

const CardTextContainer = styled.div`
  text-align: center;
  margin: 5px;
  border-radius: 2px;
  position: relative;
  top: 25%;
`;

const CardTitle = styled.div`
  color: white;
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: bolder;
  white-space: normal;
`;

const CardSubTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ICardUserImageProps {
  url: string;
}

const CardUserImage = styled<ICardUserImageProps, any>("div")`
  width: 30px;
  height: 30px;
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  transition: filter 0.5s ease;
  background-image: url(${props => `${props.url}`});
  background-size: auto 100%;
  background-position: 50% 50%;
  &:hover {
    filter: brightness(0.5);
  }
  margin-right: 10px;
`;

const BoardTwoContainer = styled.div``;

interface IProps {
  type: string;
  posts: any[];
}

interface IState {
  counter: number;
}

class FeaturedPostCards extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  public render() {
    const { posts } = this.props;
    return (
      <React.Fragment>
        {posts && (
          <BoardContainer>
            <BoardOneContainer>
              <FeaturedContainer>
                <FeaturedButtonContainer>
                  <FeaturedCardButtonContainer>
                    <FeaturedCardType>{this.props.type}</FeaturedCardType>
                  </FeaturedCardButtonContainer>
                  <FeaturedCardCounterContainer>
                    <FeaturedCardCounter isSelected={0 === this.state.counter}>
                      <i className="fas fa-minus" />
                    </FeaturedCardCounter>
                    <FeaturedCardCounter isSelected={1 === this.state.counter}>
                      <i className="fas fa-minus" />
                    </FeaturedCardCounter>
                    <FeaturedCardCounter isSelected={2 === this.state.counter}>
                      <i className="fas fa-minus" />
                    </FeaturedCardCounter>
                    <FeaturedCardCounter isSelected={3 === this.state.counter}>
                      <i className="fas fa-minus" />
                    </FeaturedCardCounter>
                    <FeaturedCardCounter isSelected={4 === this.state.counter}>
                      <i className="fas fa-minus" />
                    </FeaturedCardCounter>
                  </FeaturedCardCounterContainer>
                </FeaturedButtonContainer>
                <Slider>
                  <SlideHandle
                    className="handle handlePrev active"
                    role="button"
                    aria-label="이전 콘텐츠 보기"
                    style={{ left: "0px" }}
                    onClick={() => {
                      this.state.counter >= 1
                        ? this.setState({
                            counter: this.state.counter - 1
                          })
                        : this.setState({
                            counter: this.state.counter
                          });
                    }}
                  >
                    <SlideIcon className="fas fa-angle-left" />
                  </SlideHandle>
                  <FeaturedCardContainer newGuideCounter={this.state.counter}>
                    {posts.map((post: any, index: number) => (
                      <Link
                        to={`/post/read/${post.id}`}
                        style={{
                          textDecoration: "none"
                        }}
                        key={index}
                      >
                        <CardContainer>
                          <CardImage
                            url={
                              post.titleImg
                                ? post.titleImg
                                : post.category.topWikiImage !== null
                                  ? post.category.topWikiImage.shownImage
                                  : LOST_IMAGE_URL
                            }
                            alt={post.category.name}
                            pos={post.titleImgPos}
                          >
                            <CategoryContainer>
                              <CategoryTag
                                category={post.category}
                                display={"both"}
                              />
                            </CategoryContainer>
                            <CardTextContainer>
                              <CardTitle>{post.title}</CardTitle>
                              <CardSubTitle>
                                <CardUserImage url={post.user.profilePhoto} />
                                <div>{post.user.nickName}</div>
                              </CardSubTitle>
                            </CardTextContainer>
                          </CardImage>
                        </CardContainer>
                      </Link>
                    ))}
                  </FeaturedCardContainer>
                  <SlideHandle
                    className="handle handlePrev active"
                    role="button"
                    aria-label="다음 콘텐츠 보기"
                    style={{ right: "0px" }}
                    onClick={() =>
                      this.state.counter <= 3
                        ? this.setState({
                            counter: this.state.counter + 1
                          })
                        : this.setState({
                            counter: this.state.counter
                          })
                    }
                  >
                    <SlideIcon className="fas fa-angle-right" />
                  </SlideHandle>
                </Slider>
              </FeaturedContainer>
            </BoardOneContainer>
            <BoardTwoContainer />
          </BoardContainer>
        )}
      </React.Fragment>
    );
  }
}

export default FeaturedPostCards;
