import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import { Button } from "antd";

const TemplateButtonContainer = styled.div``;

const TemplateCompContainer = styled.div`
  position: absolute;
  z-index: 999;
  width: 400px;
  height: 500px;
  padding: 20px;
  right: 0px;
  background-color: white;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const TemplateMainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const TemplateMainTitle = styled.div`
  font-size: 18px;
  margin-right: 5px;
  font-weight: bolder;
`;

const TemplateSubTitle = styled.div`
  margin: 10px 0;
`;

const TemplateListContainer = styled.div`
  padding-top: 15px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 150px;
`;

const TemplateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TemplateImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const TemplateTitle = styled.div`
  text-transform: uppercase;
  margin: 3px;
  font-weight: bolder;
`;

const templates = [
  {
    img:
      "https://i.pinimg.com/originals/16/e7/97/16e79777b26e81c744035eca7bc971eb.jpg",
    title: "empty",
    content: []
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Fast_text.png/220px-Fast_text.png",
    title: "text",
    content: [
      {
        type: "columnList",
        onDrag: "columnList",
        content: [1],
        columnListArray: [
          [
            {
              type: "content",
              onDrag: "content",
              content: "TEXT",
              value: {
                object: "value",
                document: {
                  object: "document",
                  data: {},
                  nodes: [
                    {
                      object: "block",
                      type: "paragraph",
                      isVoid: false,
                      data: {},
                      nodes: [
                        {
                          object: "text",
                          leaves: [
                            {
                              object: "leaf",
                              text: "",
                              marks: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ]
        ]
      }
    ]
  },
  {
    img: "http://news.cdn.leagueoflegends.com/public/images/misc/GameBox.jpg",
    title: "AOS",
    content: []
  },
  {
    img:
      "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcU3EWF.rF02bJq3LB9LIVA_LXepm.kCPOQ4_cKJrT3mNU09GRvf63Sw8mJOwJyPwTsBgu29Q5EExBEeL.dmP.Pgg.s0DfbXJIDBlq3P0gdv5NnEihj5ZsbHJXq8c1qBb5S_rM3Mw7jA.pf7q9_XkrDxp7oR2Jtm.GLl8v2kQARR0-&h=300&w=200&format=jpg",
    title: "Adventrue",
    content: []
  },
  {
    img: "https://images-na.ssl-images-amazon.com/images/I/81DdU94na7L.jpg",
    title: "TCG",
    content: []
  }
] as any;

interface IState {
  isOpen: boolean;
}

class Template extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  public render() {
    const { onTemplateClick } = this.props;
    const { isOpen } = this.state;
    return (
      <TemplateButtonContainer>
        <Button onClick={() => this.setState({ isOpen: !isOpen })}>
          TEMPLATES
        </Button>
        {isOpen && (
          <TemplateCompContainer>
            <TemplateMainTitleContainer>
              <TemplateMainTitle>RECOMMANDED</TemplateMainTitle>
              {/* <TemplateMainTitle>MY</TemplateMainTitle> */}
            </TemplateMainTitleContainer>
            <TemplateSubTitle>Total {templates.length}</TemplateSubTitle>
            <TemplateListContainer>
              {templates.map((template: any) => (
                <TemplateContainer
                  onClick={() => {
                    onTemplateClick(template.content);
                  }}
                >
                  <TemplateImage src={template.img} />
                  <TemplateTitle>{template.title}</TemplateTitle>
                </TemplateContainer>
              ))}
            </TemplateListContainer>
          </TemplateCompContainer>
        )}
      </TemplateButtonContainer>
    );
  }
}

export default onClickOutside(Template);
