import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import Progress from "../common/progress";
import PlayRoomControllerComponent from "./play_room_controller";
import {Visitor} from "../../../domain/model/visitor";
import {User} from "../../../domain/model/user";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    isModalForVoteGameReady: boolean;
    user: User | null
    playRoom: PlayRoom | null;
    visitors: Visitor[];
    handleUpdatePlayRoomPlayer: (playerBlack: User | null, playerWhite: User |null ) => (event: React.MouseEvent<HTMLDivElement>) => void;
    handleVoteGameReadyCreate: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCancelGameReady: (event: (React.MouseEvent | React.KeyboardEvent)) => void;
}

const PlayRoomComponent: React.FC<IProps> = (props) => {

    const {isInit, isModalForVoteGameReady, user, playRoom, visitors, handleUpdatePlayRoomPlayer, handleVoteGameReadyCreate, handleCancelGameReady} = props;

    if (isInit) { return <Progress/>}
    if (!playRoom) { return <Progress/>}

    return (
        <>
            <PlayRoomControllerComponent
                isModalForVoteGameReady={isModalForVoteGameReady}
                playRoom={playRoom}
                visitors={visitors}
                user={user}
                handleUpdatePlayRoomPlayer={handleUpdatePlayRoomPlayer}
                handleVoteGameReadyCreate={handleVoteGameReadyCreate}
                handleCancelGameReady={handleCancelGameReady}
            />

        </>
    );

};

export default PlayRoomComponent;
