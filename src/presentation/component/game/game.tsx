import React from 'react';
import {State} from "../../../domain/model/board";
import {Game} from "../../../domain/model/game";

import GameControllerComponent from "./game_controller";
import GameBoardComponent from "./game_board";
import {Cell, GameTree} from "../../../domain/model/game_detail";
import {User} from "../../../domain/model/user";
import {Score} from "../../../domain/model/score";

interface IProps {
    isLoading: boolean;
    myPlayer: User | null;
    size: number;
    game: Game;
    score: Score | null;
    gameTree: GameTree;
    handleUpdateGameTree: (gameTreePromise: GameTree, cell: Cell) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameComponent: React.FC<IProps> = (props) => {

    const {isLoading, myPlayer, size, game, gameTree, score, handleUpdateGameTree} = props;

    // Userの状態を設定
    let isPlayer: boolean = false;
    if (myPlayer && (myPlayer.id === game.playerWhite.id || myPlayer.id === game.playerBlack.id )) { isPlayer = true}

    let isMyTurn: boolean = false;
    if (myPlayer && (game.playerWhite.id === myPlayer.id)) { isMyTurn = gameTree.player === State.State_White }
    if (myPlayer && (game.playerBlack.id === myPlayer.id)) { isMyTurn = gameTree.player === State.State_Black }
    if (game.playerBlack.id === game.playerWhite.id) { isMyTurn = true }
    if (!isPlayer) { isMyTurn = false}

    return (
        <>
            <GameControllerComponent
                isLoading={isLoading}
                isPlayer={isPlayer}
                isMyTurn={isMyTurn}
                game={game}
                score={score}
            />

            <GameBoardComponent
                isLoading={isLoading}
                isPlayer={isPlayer}
                isMyTurn={isMyTurn}
                size={size}
                gameTree={gameTree}
                handleUpdateGameTree={handleUpdateGameTree}
            />
        </>
    );

};


export default GameComponent;
