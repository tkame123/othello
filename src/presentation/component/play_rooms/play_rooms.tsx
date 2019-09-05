import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomsControllerComponent from "./play_room_controller";
import PlayRoomsListComponent from "./play_rooms_list";

interface IProps {
    isLoading: boolean;
    playRooms: PlayRoom[];
    handleCreatePlayRooms: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomsComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {playRooms, handleCreatePlayRooms} = props;

    return (
        <>
            <PlayRoomsControllerComponent
                isLoading={isLoading}
                handleCreatePlayRooms={handleCreatePlayRooms}
            />

            <PlayRoomsListComponent
                playRooms={playRooms}
            />
        </>
    );

};


export default PlayRoomsComponent;
