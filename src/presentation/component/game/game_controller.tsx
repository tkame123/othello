import React from 'react';
import styled from "styled-components";
import {Game, GameStatus} from "../../../domain/model/game";
import {Score} from "../../../domain/model/score";

import {config} from "../../../util/config";
import {GameTree} from "../../../domain/model/game_detail";
import Button from "../common/button";

interface IProps {
    isPlayer: boolean;
    isMyTurn: boolean;
    game: Game;
    gameTree: GameTree;
    score: Score | null;
    handleSurrender: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const GameControllerComponent: React.FC<IProps> = (props) => {

    const {isPlayer, isMyTurn, game, score, handleSurrender} = props;

    const isFinished: boolean = game.gameStatus === GameStatus.GameStatus_End_Processing;

    return (
        <>

            {isFinished && <StatusContents>This game is finished!</StatusContents>}
            {!isFinished && !isPlayer && <StatusContents>You are guest!</StatusContents>}
            {!isFinished && isPlayer && isMyTurn && <StatusContents>Your Turn</StatusContents>}
            {!isFinished && isPlayer && !isMyTurn && <StatusContents>Opponent Turn</StatusContents>}

            {isFinished &&
                <ScoreBoxWrapper>
                    <div>BlackScore:{score && score.playerBlack.value}</div>
                    <div>WhiteScore:{score && score.playerWhite.value}</div>
                </ScoreBoxWrapper>
            }

            {!isFinished && isPlayer && isMyTurn &&
                <ControlBoxWrapper>
                    <Button onClick={handleSurrender}>Give Up</Button>
                </ControlBoxWrapper>
            }
        </>
    );

};

export default GameControllerComponent;

const StatusContents = styled.div`
    margin: 0.2em;
    padding: 5px 0px;
    text-align: center;
    background-color: ${config().style.color.secondaryDark};
`;

const ScoreBoxWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0.2em;
    padding: 5px 0px;
`;

const ControlBoxWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0.2em;
    padding: 5px 0px;
`;
