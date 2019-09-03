import React from 'react';
import {State} from "../../../domain/model/board";
import {Game} from "../../../domain/model/game";

import GameControllerComponent from "./game_controller";
import GameBoardComponent from "./game_board";
import {Cell, GameTree, Score} from "../../../domain/model/game_detail";

interface IProps {
    isLoading: boolean;
    size: number;
    game: Game;
    score: Score | null;
    gameTree: GameTree;
    handleUpdateGameTree: (gameTreePromise: GameTree, cell: Cell) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameComponent: React.FC<IProps> = (props) => {

    const {isLoading, size} = props;
    const {game, gameTree, score, handleUpdateGameTree} = props;

    const player: State = gameTree.player;

    return (
        <>
            <GameControllerComponent
                isLoading={isLoading}
                game={game}
                player={player}
                score={score}
            />

            <GameBoardComponent
                isLoading={isLoading}
                size={size}
                gameTree={gameTree}
                handleUpdateGameTree={handleUpdateGameTree}
            />
        </>
    );

};


export default GameComponent;
