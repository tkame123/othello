import React from 'react';
import styled from "styled-components";
import {Game, GameStatus} from "../../../domain/model/game";
import {User} from "../../../domain/model/user";
import {Score} from "../../../domain/model/score";

import {config} from "../../../util/config";
import {GameTree} from "../../../domain/model/game_detail";
import {State} from "../../../domain/model/board";

interface IProps {
    isPlayer: boolean;
    isMyTurn: boolean;
    game: Game;
    gameTree: GameTree;
    score: Score | null;
}

const GameControllerComponent: React.FC<IProps> = (props) => {

    const {isPlayer, isMyTurn, game, gameTree, score} = props;

    const playerBlack: User = game.playerBlack;
    const playerWhite: User = game.playerWhite;
    const isFinished: boolean = game.gameStatus === GameStatus.GameStatus_End;

    return (
        <>

            {isFinished && <StatusContents>This game is finished!</StatusContents>}
            {!isFinished && !isPlayer && <StatusContents>You are guest!</StatusContents>}
            {!isFinished && isPlayer && isMyTurn && <StatusContents>My Turn</StatusContents>}
            {!isFinished && isPlayer && !isMyTurn && <StatusContents>Your Turn</StatusContents>}

            <Container>
                <PlayerBox>
                    <PlayerContents isMyTurn={gameTree.player === State.State_Black}>
                        Black[{playerBlack.email}]
                        {score && ` score:${score.playerBlack.value}`}
                    </PlayerContents>
                </PlayerBox>
                <PlayerBox>
                    <PlayerContents isMyTurn={gameTree.player === State.State_White}>
                        White[{playerWhite.email}]
                        {score && ` score:${score.playerWhite.value}`}
                    </PlayerContents>
                </PlayerBox>
            </Container>
        </>
    );

};

export default GameControllerComponent;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const PlayerBox = styled.div`
    margin: 0.2em;
    padding: 5px 20px 5px 20px;
    background-color: ${config().style.color.secondaryLight};
    color: ${config().style.color.onSecondary};
    text-align: center;
    width: 300px;
    @media screen and (max-width: 812px) {
      width: 100%;
    }
`;

const PlayerContents = styled.p`
    margin-top: 0.2em;
    margin-bottom: 0.2em;
    font-weight: ${(props:{isMyTurn : boolean}) => props.isMyTurn ? "bold": "normal"};
`;

const StatusContents = styled.div`
    margin: 0.2em;
    text-align: center;
    background-color: ${config().style.color.secondaryDark};
`;
