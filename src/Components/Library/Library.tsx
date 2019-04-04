import React from "react";
import styled from "styled-components";

const ImageLibraryContainer = styled.div`
  display: block;
`;

const ItemContainer = styled.ul`
  padding: 4px 0 19px;
  margin: 0 auto;
  width: 200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

interface IImageProps {
  url: string;
}

const Item = styled<IImageProps, any>("li")`
  width: 56px;
  height: 56px;
  margin: 0 auto;
  background: url(${props => props.url});
  background-size: 100% auto;
  background-position: 50% 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  &:hover {
    outline: 2px solid #38ada9;
    outline-offset: -2px;
  }
`;

interface IProps {
  imageLibrary: any;
}

class Library extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { imageLibrary } = this.props;
    return (
      <ImageLibraryContainer>
        <ItemContainer>
          {imageLibrary.map((Image: any, index: number) => {
            return <Item url={Image} key={index} />;
          })}
        </ItemContainer>
      </ImageLibraryContainer>
    );
  }
}

export default Library;
