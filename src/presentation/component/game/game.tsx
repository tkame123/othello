import React from 'react';
import {State} from "../../../domain/model/board";
import {Game} from "../../../domain/model/game";

import GameControllerComponent from "./game_controller";
import GameBoardComponent from "./game_board";
import {Cell, GameDetail, GameTree} from "../../../domain/model/game_detail";
import {User} from "../../../domain/model/user";
import {Score} from "../../../domain/model/score";
import Progress from "../common/progress";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    myPlayer: User | null;
    game: Game | null;
    gameTree: GameTree | null;
    gameDetails: GameDetail[];
    score: Score | null;
    handleToggleBoard: (cell: Cell, isPlayer: boolean, isMyTurn: boolean) => (event: React.MouseEvent<HTMLTableDataCellElement>) => void;
    handleSurrender: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameComponent: React.FC<IProps> = (props) => {

    const {isInit, myPlayer, game, gameTree, gameDetails, score, handleToggleBoard, handleSurrender} = props;

    if (isInit) { return <Progress/>}
    if (!game || !gameTree) { return <Progress/>}

    // Userの状態を設定
    let isPlayer: boolean = false;
    if (myPlayer && (myPlayer.id === game.playerWhite.id || myPlayer.id === game.playerBlack.id )) { isPlayer = true}

    let isMyTurn: boolean = false;
    if (myPlayer && (game.playerWhite.id === myPlayer.id)) { isMyTurn = gameTree.player === State.State_White }
    if (myPlayer && (game.playerBlack.id === myPlayer.id)) { isMyTurn = gameTree.player === State.State_Black }
    if (game.playerBlack.id === game.playerWhite.id) { isMyTurn = true }
    if (!isPlayer) { isMyTurn = false}

    const boardSize: number = game.boardSize;

    return (
        <>
            <GameControllerComponent
                isPlayer={isPlayer}
                isMyTurn={isMyTurn}
                game={game}
                gameTree={gameTree}
                score={score}
                handleSurrender={handleSurrender}
            />

            <GameBoardComponent
                isPlayer={isPlayer}
                isMyTurn={isMyTurn}
                boardSize={boardSize}
                gameTree={gameTree}
                gameDetails={gameDetails}
                handleToggleBoard={handleToggleBoard}
            />
        </>
    );

};


export default GameComponent;
