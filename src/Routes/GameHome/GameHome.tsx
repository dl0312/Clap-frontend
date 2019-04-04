import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { getGameByIdVariables, getGameById } from "src/types/api";
import { GET_GAME_BY_ID } from "src/sharedQueries";
import Helmet from "react-helmet";
import Board from "src/Components/Board";
import { Route } from "react-router";
import AutoSuggestInput from "src/Components/AutoSuggestInput";

const GameHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  position: relative;
  z-index: 2;
  width: 200px;
`;

interface IWallpaperProps {
  url: string;
}

const Wallpaper = styled<IWallpaperProps, any>("div")`
  min-width: 1500px;
  max-width: 2000px;
  min-height: 600px;
  width: 100%;
  background: linear-gradient(#f0f2f5, transparent, #f0f2f5),
    url(${props => props.url});
  position: fixed;
  background-size: 100%;
  top: 50px;
`;

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
        <GameHomeContainer>
          <GetGameByIdQuery query={GET_GAME_BY_ID} variables={{ gameId }}>
            {({ loading, error, data }) => {
              if (loading) return "loading";
              if (error) return "error";
              if (data !== undefined) {
                const { game } = data.GetGameById;
                return (
                  game && (
                    <>
                      <Helmet>
                        <title>{game.title} | CLAP</title>
                      </Helmet>
                      <Logo src={game.logo!} />
                      <Wallpaper url={game.wallpaper!} />

                      <Route
                        render={({ history, location }) => {
                          return <Board gameId={gameId} history={history} />;
                        }}
                      />
                      <Route
                        render={({ history }) => {
                          return (
                            <AutoSuggestInput
                              gameId={gameId}
                              history={history}
                            />
                          );
                        }}
                      />
                    </>
                  )
                );
              }
              return null;
            }}
          </GetGameByIdQuery>
        </GameHomeContainer>
      </>
    );
  }
}

export default GameHome;
