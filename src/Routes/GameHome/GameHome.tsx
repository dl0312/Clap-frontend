import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { getGameByIdVariables, getGameById } from "src/types/api";
import { GET_GAME_BY_ID } from "src/sharedQueries";

class GetGameByIdQuery extends Query<getGameById, getGameByIdVariables> {}

interface IProps {
  history: any;
  match: { params: { gameId: number } };
}

class GameHome extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      gameId: null
    };
  }
  public render() {
    const { gameId } = this.props.match.params;
    return (
      <>
        <GetGameByIdQuery query={GET_GAME_BY_ID} variables={{ gameId }}>
          {({ loading, error, data }) => {
            if (loading) return "loading";
            if (error) return "error";
            if (data !== undefined) {
              const { game } = data.GetGameById;
              return (
                game && (
                  <div>
                    {gameId}, {game.title}
                  </div>
                )
              );
            }
            return null;
          }}
        </GetGameByIdQuery>
      </>
    );
  }
}

export default GameHome;
