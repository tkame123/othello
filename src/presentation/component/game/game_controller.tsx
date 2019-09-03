import React from 'react';
// import styled, {css} from "styled-components";
import {State} from "../../../domain/model/board";
import {Game} from "../../../domain/model/game";
import {User} from "../../../domain/model/user";
import {Score} from "../../../domain/model/game_detail";

interface IProps {
    isLoading: boolean;
    game: Game;
    player: State;
    score: Score | null;
}

const GameControllerComponent: React.FC<IProps> = (props) => {

    const {game, player, score} = props;

    const playerBlack: User = game.playerBlack;
    const playerWhite: User = game.playerWhite;

    return (
        <>

            {`黒は${playerBlack.email}`}
            {`白は${playerWhite.email}`}

            {score
                ? `白の得点：${score.whiteScore} 黒の得点：${score.blackScore} `
                : player === State.State_White ? "白の番です"　: "黒の番です"
            }


        </>
    );

};


export default GameControllerComponent;
