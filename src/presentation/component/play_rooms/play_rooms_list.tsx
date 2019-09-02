import React from 'react';
// import styled, {css} from "styled-components";
import {PlayRoom} from "../../../domain/model/play_room";
import Progress from "../common/progress";

interface IProps {
    isLoading: boolean;
    playRooms: PlayRoom[];
}

const PlayRoomsListComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {playRooms} = props;

    if (!playRooms.length) {return <div>無い</div>}

    return (
        <>
            {isLoading && <Progress/>}

            {playRooms.map((item: PlayRoom, index: number) => {
                return <div key={index}>{item.id} {item.owner.email} </div>
            })}

        </>
    );

};


export default PlayRoomsListComponent;
