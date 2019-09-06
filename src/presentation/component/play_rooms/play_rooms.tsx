import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";

import PlayRoomsControllerComponent from "./play_rooms_controller";
import PlayRoomsListComponent from "./play_rooms_list";
import Progress from "../common/progress";
import EmptyData from "../common/empty";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    myPlayRooms: PlayRoom[];
    opponentPlayRooms: PlayRoom[];
    handleCreatePlayRooms: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleDeletePlayRooms: (playRooms: PlayRoom[]) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomsComponent: React.FC<IProps> = (props) => {

    const {isInit, isLoading, myPlayRooms, opponentPlayRooms, handleCreatePlayRooms, handleDeletePlayRooms} = props;

    if (isInit) { return <Progress/>}


    return (
        <>
            <PlayRoomsControllerComponent
                myPlayRooms={myPlayRooms}
                handleCreatePlayRooms={handleCreatePlayRooms}
                handleDeletePlayRooms={handleDeletePlayRooms}
            />

            { !isLoading && (myPlayRooms.length === 0 && opponentPlayRooms.length === 0) && <EmptyData/> }
            { !isLoading && (myPlayRooms.length !== 0 || opponentPlayRooms.length !== 0) && (
                <PlayRoomsListComponent
                    myPlayRooms={myPlayRooms}
                    opponentPlayRooms={opponentPlayRooms}
                />)
            }

        </>
    );

};


export default PlayRoomsComponent;
