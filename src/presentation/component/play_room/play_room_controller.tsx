import React from 'react';
import styled from "styled-components";
import Button from "../common/button";

import {PlayRoom} from "../../../domain/model/play_room";
import {User} from "../../../domain/model/user";

import PlayRoomModalVoteComponent from "./play_room_modal_vote";

interface IProps {
    isModalForVoteGameReady: boolean;
    playRoom: PlayRoom;
    user: User | null
    handleUpdatePlayRoomPlayer: (playerBlack: User | null, playerWhite: User |null ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleVoteGameReadyCreate: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCancelGameReady: (event: (React.MouseEvent | React.KeyboardEvent)) => void;
}

const PlayRoomControllerComponent: React.FC<IProps> = (props) => {

    const {isModalForVoteGameReady, user, playRoom, handleUpdatePlayRoomPlayer, handleVoteGameReadyCreate, handleCancelGameReady} = props;

    if (!user) {throw new Error("")}

    return (
        <Wrapper>

            <Inner>
                <Button onClick={handleUpdatePlayRoomPlayer(user, playRoom.playerWhite)}>Black</Button>
                <Button onClick={handleUpdatePlayRoomPlayer(null, playRoom.playerWhite)}>BlackCancel</Button>
                <Button onClick={handleUpdatePlayRoomPlayer(playRoom.playerBlack, user)}>white</Button>
                <Button onClick={handleUpdatePlayRoomPlayer(playRoom.playerBlack, null)}>whiteCancel</Button>
                <PlayRoomModalVoteComponent
                    isModalForVoteGameReady={isModalForVoteGameReady}
                    handleVoteGameReadyCreate={handleVoteGameReadyCreate}
                    handleCancelGameReady={handleCancelGameReady}
                />
                Black: {playRoom.playerBlack ? playRoom.playerBlack.email : "Empty"} White: {playRoom.playerWhite ? playRoom.playerWhite.email : "Empty"}

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

// const BlackPlayerWrapper = styled.div`
//     position: relative;
//     top: 10px;
//     height: 2em;
//     width: 100%;
//     padding-left: 10px;
//     padding-right: 10px;
// `;
//
// const BlackPlayerTitle = styled.div`
//     position: relative;
//     top: 10px;
//     height: 2em;
//     width: 100%;
//     padding-left: 10px;
//     padding-right: 10px;
// `;
//
// const BlackPlayerExist = styled.div`
//     position: relative;
//     top: 10px;
//     height: 2em;
//     width: 100%;
//     padding-left: 10px;
//     padding-right: 10px;
// `;

