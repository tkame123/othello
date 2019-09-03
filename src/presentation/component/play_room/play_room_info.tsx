import React from 'react';
// import styled, {css} from "styled-components";
import {PlayRoom} from "../../../domain/model/play_room";
import Progress from "../common/progress";
import {Link} from "react-router-dom";

interface IProps {
    isLoading: boolean;
    playRoom: PlayRoom;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomInfoComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {playRoom, handleCreateNewGame} = props;

    const gameId: string | null = playRoom.gameId;

    return (
        <>
            {isLoading && <Progress/>}

            {`${playRoom.owner.email}の部屋`}

            {!gameId && <p>ゲームが開始されていない</p> }

            {!gameId && <button onClick={handleCreateNewGame}>New Game</button> }

            {gameId && <Link to={`/game/${gameId}`}>GameLink</Link> }

        </>
    );

};


export default PlayRoomInfoComponent;
