import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomInfoComponent from "./play_room_info";
import Progress from "../common/progress";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    playRoom: PlayRoom | null;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomComponent: React.FC<IProps> = (props) => {

    const {isInit, playRoom, handleCreateNewGame} = props;

    if (isInit) { return <Progress/>}
    if (!playRoom) { return <Progress/>}

    return (
        <>

            <PlayRoomInfoComponent
                playRoom={playRoom}
                handleCreateNewGame={handleCreateNewGame}
            />
        </>
    );

};


export default PlayRoomComponent;
