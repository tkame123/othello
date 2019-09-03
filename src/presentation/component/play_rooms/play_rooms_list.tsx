import React from 'react';
// import styled, {css} from "styled-components";
import {PlayRoom} from "../../../domain/model/play_room";
import Progress from "../common/progress";
import {Link} from "react-router-dom";

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
                return <Link key={index} to={`/playroom/${item.id}`}>{item.id} {item.owner.email} </Link>
            })}

        </>
    );

};


export default PlayRoomsListComponent;
