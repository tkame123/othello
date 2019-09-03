import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomInfoComponent from "./play_room_info";

interface IProps {
    isLoading: boolean;
    playRoom: PlayRoom;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {playRoom, handleCreateNewGame} = props;

    return (
        <>

            <PlayRoomInfoComponent
                isLoading={isLoading}
                playRoom={playRoom}
                handleCreateNewGame={handleCreateNewGame}
            />
        </>
    );

};


export default PlayRoomComponent;
