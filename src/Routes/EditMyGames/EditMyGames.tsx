import React from "react";
import styled from "styled-components";
import { Mutation, Query } from "react-apollo";
import {
  getAllGames,
  getMyProfile,
  editMyGames,
  editMyGamesVariables
} from "src/types/api";
import { Select, Button, Form } from "antd";
import { GAMES, PROFILE, EDIT_MY_GAMES } from "src/sharedQueries";
import FormItem from "antd/lib/form/FormItem";
import Helmet from "react-helmet";
import { toast } from "react-toastify";
const Option = Select.Option;

const EditMyGamesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class GetMyProfileQuery extends Query<getMyProfile> {}
class GetAllGamesQuery extends Query<getAllGames> {}
class EditMyGamesQuery extends Mutation<editMyGames, editMyGamesVariables> {}

class EditMyGames extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameIds: []
    };
  }

  public confirm = async (data: any) => {
    const { EditMyGames } = data;
    console.log(data);
    if (EditMyGames.ok) {
      toast.success("My Games Edit Success");
      this.props.history.push(`/`);
    } else {
      toast.error(EditMyGames.error);
    }
  };

  public render() {
    const { gameIds } = this.state;
    return (
      <>
        <Helmet>
          <title>Games | CLAP</title>
        </Helmet>
        <EditMyGamesContainer>
          <GetMyProfileQuery
            query={PROFILE}
            onCompleted={(data: any) => {
              const { games }: any = data.GetMyProfile.user;
              console.log(data, games);
              this.setState({
                gameIds: games
                  ? games.map((game: any) => {
                      return game.id;
                    })
                  : []
              });
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return "loading";
              if (error) return "error";
              console.log(data);
              if (data !== undefined) {
                return (
                  <Form layout={"vertical"} style={{ width: 400 }}>
                    <GetAllGamesQuery
                      query={GAMES}
                      fetchPolicy={"cache-and-network"}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return "loading";
                        if (error) return "error";
                        if (data !== undefined) {
                          const { games } = data.GetAllGames!;
                          return (
                            <FormItem label="Games">
                              <Select
                                mode="multiple"
                                allowClear={true}
                                showSearch={true}
                                placeholder="Please select children categories"
                                onChange={(values: any) => {
                                  console.log(values);
                                  this.setState({
                                    gameIds: values.map((value: any) =>
                                      parseInt(value, 10)
                                    )
                                  });
                                }}
                                value={this.state.gameIds.map((gameId: any) => {
                                  return JSON.stringify(gameId);
                                })}
                                optionFilterProp="children"
                                filterOption={(input, option: any) => {
                                  console.log(
                                    option.props.children.props.children[1]
                                      .props.children
                                  );
                                  return (
                                    option.props.children.props.children[1].props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                              >
                                {games &&
                                  games.map((game, index) => {
                                    return (
                                      game && (
                                        <Option key={JSON.stringify(game.id)}>
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-start",
                                              alignItems: "center",
                                              verticalAlign: "top"
                                            }}
                                          >
                                            {game.icon && (
                                              <img
                                                style={{
                                                  height: "20px",
                                                  borderRadius: 4
                                                }}
                                                src={game.icon}
                                              />
                                            )}
                                            <span style={{ padding: "0 7px" }}>
                                              {game.title}
                                            </span>
                                          </span>
                                        </Option>
                                      )
                                    );
                                  })}
                              </Select>
                            </FormItem>
                          );
                        } else {
                          return null;
                        }
                      }}
                    </GetAllGamesQuery>
                    <EditMyGamesQuery
                      mutation={EDIT_MY_GAMES}
                      onCompleted={data => this.confirm(data)}
                    >
                      {EditMyGames => (
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          onClick={(e: any) => {
                            e.preventDefault();
                            EditMyGames({
                              variables: {
                                gameIds
                              }
                            });
                          }}
                        >
                          Send
                        </Button>
                      )}
                    </EditMyGamesQuery>
                  </Form>
                );
              } else {
                return null;
              }
            }}
          </GetMyProfileQuery>
        </EditMyGamesContainer>
      </>
    );
  }
}

export default EditMyGames;
