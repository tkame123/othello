import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomInfoComponent from "./play_room_info";
import Progress from "../common/progress";
import PlayRoomControllerComponent from "./play_room_controller";
import {Visitor} from "../../../domain/model/visitor";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    playRoom: PlayRoom | null;
    visitors: Visitor[];
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomComponent: React.FC<IProps> = (props) => {

    const {isInit, playRoom, visitors, handleCreateNewGame} = props;

    if (isInit) { return <Progress/>}
    if (!playRoom) { return <Progress/>}

    return (
        <>
            <PlayRoomControllerComponent
                playRoom={playRoom}
                handleCreateNewGame={handleCreateNewGame}
            />

            <PlayRoomInfoComponent
                playRoom={playRoom}
                visitors={visitors}
            />
        </>
    );

};


export default PlayRoomComponent;
