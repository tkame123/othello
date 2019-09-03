import React from 'react';
// import styled, {css} from "styled-components";
import {Game} from "../../../domain/model/game";
import {User} from "../../../domain/model/user";
import {Score} from "../../../domain/model/game_detail";

interface IProps {
    isLoading: boolean;
    isPlayer: boolean;
    isMyTurn: boolean;
    game: Game;
    score: Score | null;
}

const GameControllerComponent: React.FC<IProps> = (props) => {

    const {game, isPlayer, isMyTurn, score} = props;

    const playerBlack: User = game.playerBlack;
    const playerWhite: User = game.playerWhite;

    return (
        <>

            {`黒は${playerBlack.email}`}
            {`白は${playerWhite.email}`}

            {score
                ? `白の得点：${score.whiteScore} 黒の得点：${score.blackScore} `
                :  isPlayer && isMyTurn ? "あなたの番です"　: "相手の番です"
            }


        </>
    );

};


export default GameControllerComponent;
