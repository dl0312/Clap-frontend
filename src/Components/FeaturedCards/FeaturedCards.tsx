import * as React from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
  font-family: "Open Sans", sans-serif;
`;

const BoardOneContainer = styled.div`
  width: 100%;
  padding: 20px 0px;
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

// const FeaturedCard = styled.div``;

const CardContainer = styled.div`
  width: 20%;
  padding: 0 2px;
  display: inline-block;
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
`;

const SlideIcon = styled.i`
  transform-origin: 55% 50%;
  height: auto;
  align-self: center;
  font-size: 2.5vw;
  color: white;
`;

interface ICardImageProps {
  url: string;
}

const CardImage = styled<ICardImageProps, any>("div")`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${props => `${props.url}`});
  background-size: 100%;
  background-position: 50% 50%;
  height: 130px;
  width: 100%;
  /* position: relative; */
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  /* margin: 5px; */
  /* border-bottom: 0.5px solid #efefef;
  border-right: 0.5px solid #efefef; */

  /* filter: brightness(0.5); */
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

const Category = styled.div`
  padding: 3px 5px;
  background-color: white;
  color: black;
  font-weight: bolder;
  border-radius: 2px;
  font-size: 10px;
  margin-left: 2px;
  margin-right: 2px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
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
`;

const CardSubTitle = styled.div`
  color: white;
`;

const BoardTwoContainer = styled.div``;

interface IProps {
  type: string;
  posts: any[];
}

interface IState {
  hoverImgJson: string;
  onImage: boolean;
  pos: { x: number; y: number };
  counter: number;
}

class FeaturedCards extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hoverImgJson: "",
      onImage: false,
      pos: { x: 0, y: 0 },
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
                    onClick={() =>
                      this.setState({
                        counter: this.state.counter - 1
                      })
                    }
                  >
                    <SlideIcon className="fas fa-angle-left" />
                  </SlideHandle>
                  <FeaturedCardContainer newGuideCounter={this.state.counter}>
                    {posts.map((post: any, index: number) => (
                      <CardContainer>
                        <CardImage
                          url={
                            post.category.wikiImages[0] !== undefined
                              ? `http://localhost:4000/uploads/${
                                  post.category.wikiImages[0].shownImage.url
                                }`
                              : "https://image.freepik.com/free-icon/question-mark-inside-a-box-outline_318-51427.jpg"
                          }
                          alt={post.category.name}
                        >
                          <CategoryContainer>
                            {post.category.parent![0] !== undefined ? (
                              <Category>
                                {`# ${post.category.parent![0]!.name}`}
                              </Category>
                            ) : null}
                            <Category>{`# ${post.category.name}`}</Category>
                          </CategoryContainer>
                          <CardTextContainer>
                            <CardTitle>{post.title}</CardTitle>
                            <CardSubTitle>BY {post.user.nickName}</CardSubTitle>
                          </CardTextContainer>
                        </CardImage>
                      </CardContainer>
                    ))}
                  </FeaturedCardContainer>
                  <SlideHandle
                    className="handle handlePrev active"
                    role="button"
                    aria-label="다음 콘텐츠 보기"
                    style={{ right: "0px" }}
                    onClick={() =>
                      this.setState({
                        counter: this.state.counter + 1
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

export default FeaturedCards;
