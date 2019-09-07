import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomsControllerComponent from "./play_rooms_controller";
import PlayRoomsListComponent from "./play_rooms_list";
import Progress from "../common/progress";
import EmptyData from "../common/empty";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    playRooms: PlayRoom[];
    handleCreatePlayRooms: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomsComponent: React.FC<IProps> = (props) => {

    const {isInit, isLoading, playRooms, handleCreatePlayRooms} = props;

    if (isInit) { return <Progress/>}


    return (
        <>
            <PlayRoomsControllerComponent
                handleCreatePlayRooms={handleCreatePlayRooms}
            />

            { !isLoading && playRooms.length === 0 && <EmptyData/> }
            { !isLoading && playRooms.length > 0 && (
                <PlayRoomsListComponent
                    playRooms={playRooms}
                />)
            }

        </>
    );

};


export default PlayRoomsComponent;
