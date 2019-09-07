import React from 'react';
import styled from "styled-components";
import Button from "../common/button";

import {PlayRoom} from "../../../domain/model/play_room";
import {User} from "../../../domain/model/user";

interface IProps {
    playRoom: PlayRoom;
    user: User | null
    handleUpdatePlayRoomPlayer: (playerBlack: User | null, playerWhite: User |null ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomControllerComponent: React.FC<IProps> = (props) => {

    const {user, playRoom, handleUpdatePlayRoomPlayer, handleCreateNewGame} = props;

    if (!user) {throw new Error("")}

    return (
        <Wrapper>

            <Inner>
                Black: {playRoom.playerBlack ? playRoom.playerBlack.email : "Empty"} White: {playRoom.playerWhite ? playRoom.playerWhite.email : "Empty"}
                <Button onClick={handleUpdatePlayRoomPlayer(user, playRoom.playerWhite)}>Black</Button>
                <Button onClick={handleUpdatePlayRoomPlayer(null, playRoom.playerWhite)}>BlackCancel</Button>
                <Button onClick={handleUpdatePlayRoomPlayer(playRoom.playerBlack, user)}>white</Button>
                <Button onClick={handleUpdatePlayRoomPlayer(playRoom.playerBlack, null)}>whiteCancel</Button>
                {!playRoom.gameId && <Button onClick={handleCreateNewGame}>Create Game</Button>}
            </Inner>

        </Wrapper>
    );

};

export default PlayRoomControllerComponent;

const Wrapper = styled.div`
    margin: 10px auto;
    width: 70%;
    @media screen and (max-width: 812px) {
      width: 100%;
    }
`;

const Inner = styled.div`
    position: relative;
    top: 10px;
    height: 2em;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;
