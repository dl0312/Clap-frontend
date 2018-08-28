import * as React from "react";
import styled from "styled-components";

const SocialMediaContainer = styled.div`
  border-top: 0 solid transparent;
  border-right: 0 solid transparent;
  border-left: 0 solid transparent;
  border-bottom: 0 solid transparent;
  display: flex;
`;

const Button = styled.button`
  border-radius: 100%;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
`;

const SocialMedia: React.SFC<any> = () => {
  return (
    <SocialMediaContainer>
      <Button style={{ backgroundColor: "#1da1f2" }}>
        <i className="fab fa-twitter" />
      </Button>
      <Button style={{ backgroundColor: "#3b5998" }}>
        <i className="fab fa-facebook-f" />
      </Button>
      <Button
        style={{
          background:
            "radial-gradient(circle at 33% 100%, #FED373 4%, #F15245 30%, #D92E7F 62%, #9B36B7 85%, #515ECF)"
        }}
      >
        <i className="fab fa-instagram" />
      </Button>
      <Button style={{ backgroundColor: "#ed3124" }}>
        <i className="fab fa-youtube" />
      </Button>
    </SocialMediaContainer>
  );
};

export default SocialMedia;
