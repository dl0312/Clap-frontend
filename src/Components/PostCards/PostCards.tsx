import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "../../config/_mixin";
import { LOST_IMAGE_URL } from "../../constants";

const PostCardsInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SuggestionContainer = styled.div`
  width: 100%;
  align-self: flex-start;
  margin: 30px 4% 10px 4%;
`;

const SuggestionTitle = styled.span`
  display: inline;
  color: grey;
`;

const SuggestionSubtitle = styled.span`
  display: inline;
`;

const PostCardsContainer = styled.div`
  padding: 30px 4% 10px 4%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 7px;
`;

const CardContainer = styled.div`
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  margin: 0 2px;
  display: inline-flex;
  transition: width 0.5s ease;
  ${media.tablet`width: 25%;`};
  ${media.phone`width: 50%;`};
`;

interface ICardImageProps {
  url: string;
}

const CardImage = styled<ICardImageProps, any>("div")`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
    url(${props => `${props.url}`});
  background-size: 130%;
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

interface IProps {
  posts: any;
}

// interface IState {

// }

class PostCards extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { posts } = this.props;
    return (
      <PostCardsInfoContainer>
        <SuggestionContainer>
          <SuggestionTitle>Recommended Keyword: </SuggestionTitle>
          <SuggestionSubtitle>Keyword</SuggestionSubtitle>
        </SuggestionContainer>
        <PostCardsContainer>
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
                    post.category.wikiImages[0] !== undefined
                      ? post.category.wikiImages[0].shownImage
                      : LOST_IMAGE_URL
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
                    <CardSubTitle>
                      <CardUserImage url={post.user.profilePhoto} />
                      <div>{post.user.nickName}</div>
                    </CardSubTitle>
                  </CardTextContainer>
                </CardImage>
              </CardContainer>
            </Link>
          ))}
        </PostCardsContainer>
      </PostCardsInfoContainer>
    );
  }
}

export default PostCards;
