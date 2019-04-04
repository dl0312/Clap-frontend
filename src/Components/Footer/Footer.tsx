import React from "react";
import { Divider } from "antd";
import styled from "styled-components";

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 300px 0 50px;
`;

const Section = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Lang = styled.span`
  cursor: pointer;
`;

interface IProps {
  changeLocale: any;
}

class Footer extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    const { changeLocale } = this.props;
    return (
      <FooterContainer>
        <div>
          <Section>
            Company
            <Divider type="vertical" />
            Recruitment
            <Divider type="vertical" />
            Partnership
            <Divider type="vertical" />
            Advertising
            <Divider type="vertical" />
            Terms of use
            <Divider type="vertical" />
            Privacy Policy
            <Divider type="vertical" />
            Operating principles
          </Section>
          <Section>
            <Lang onClick={() => changeLocale("ko_kr")}>Korea</Lang>
            <Divider type="vertical" />
            <Lang onClick={() => changeLocale("en_us")}>USA</Lang>
            <Divider type="vertical" />
            <Lang onClick={() => changeLocale("zh_cn")}>China</Lang>
            <Divider type="vertical" />
            <Lang onClick={() => changeLocale("ja_jp")}>Japen</Lang>
          </Section>
          <Section>Copyright ⓒ 2018 CLAP All rights reserved</Section>
        </div>
      </FooterContainer>
    );
  }
}

export default Footer;
