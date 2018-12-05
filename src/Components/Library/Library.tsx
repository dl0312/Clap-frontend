import React from "react";
import styled from "styled-components";

const ImageLibraryContainer = styled.div`
  display: block;
  max-height: 88px;
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
  background-size: 100% 100%;
  background-position: 50% 50%;
`;

interface IProps {
  ImageLibrary: any;
}

class Library extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { ImageLibrary } = this.props;
    return (
      <ImageLibraryContainer>
        <ItemContainer>
          {ImageLibrary.map((Image: any, index: number) => {
            return <Item url={Image} key={index} />;
          })}
        </ItemContainer>
      </ImageLibraryContainer>
    );
  }
}

export default Library;
