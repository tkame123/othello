import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomInfoComponent from "./play_room_info";
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
    handleUpdatePlayRoomPlayer: (playerBlack: User | null, playerWhite: User |null ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleVoteGameReadyCreate: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleVoteGameReadyDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomComponent: React.FC<IProps> = (props) => {

    const {isInit, isModalForVoteGameReady, user, playRoom, visitors, handleUpdatePlayRoomPlayer, handleCreateNewGame, handleVoteGameReadyCreate, handleVoteGameReadyDelete} = props;

    if (isInit) { return <Progress/>}
    if (!playRoom) { return <Progress/>}

    return (
        <>
            <PlayRoomControllerComponent
                isModalForVoteGameReady={isModalForVoteGameReady}
                playRoom={playRoom}
                user={user}
                handleUpdatePlayRoomPlayer={handleUpdatePlayRoomPlayer}
                handleCreateNewGame={handleCreateNewGame}
                handleVoteGameReadyCreate={handleVoteGameReadyCreate}
                handleVoteGameReadyDelete={handleVoteGameReadyDelete}
            />

            <PlayRoomInfoComponent
                playRoom={playRoom}
                visitors={visitors}
            />
        </>
    );

};


export default PlayRoomComponent;
