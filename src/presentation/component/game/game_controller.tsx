import React from 'react';
// import styled, {css} from "styled-components";
import {State} from "../../../domain/model/board";
import {Game, Score} from "../../../domain/model/game";
import Progress from "../common/progress";

interface IProps {
    isLoading: boolean;
    game: Game;
    player: State;
    score: Score | null;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameControllerComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {player, score, handleCreateNewGame} = props;

    return (
        <>
            {isLoading && <Progress/>}

            <button onClick={handleCreateNewGame}>New Game</button>

            {score
                ? `白の得点：${score.whiteScore} 黒の得点：${score.blackScore} `
                : player === State.State_White ? "白の番です"　: "黒の番です"
            }

        </>
    );

};


export default GameControllerComponent;
