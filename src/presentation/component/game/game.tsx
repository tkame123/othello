import React from 'react';
import {State} from "../../../domain/model/board";
import {Game, GameTree, Score} from "../../../domain/model/game";

import GameControllerComponent from "./game_controller";
import GameBoardComponent from "./game_board";

interface IProps {
    isLoading: boolean;
    size: number;
    game: Game;
    score: Score | null;
    gameTree: GameTree;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleUpdateGameTree: (gameTreePromise: GameTree) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameComponent: React.FC<IProps> = (props) => {

    const {isLoading, size} = props;
    const {game, gameTree, score, handleCreateNewGame, handleUpdateGameTree} = props;

    const player: State = gameTree.player;

    return (
        <>
            <GameControllerComponent
                isLoading={isLoading}
                game={game}
                player={player}
                score={score}
                handleCreateNewGame={handleCreateNewGame}
            />

            <GameBoardComponent
                isLoading={isLoading}
                size={size}
                game={game}
                gameTree={gameTree}
                handleUpdateGameTree={handleUpdateGameTree}
            />
        </>
    );

};


export default GameComponent;
