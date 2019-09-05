import React from 'react';
import styled from "styled-components";
import {PlayRoom} from "../../../domain/model/play_room";
import {Link} from "react-router-dom";
import {config} from "../../../util/config";

interface IProps {
    playRooms: PlayRoom[];
}

const PlayRoomsListComponent: React.FC<IProps> = (props) => {

    const {playRooms} = props;

    if (!playRooms.length) {return <div>無い</div>}

    return (
        <PlayRoomListUl>

            {playRooms.map((item: PlayRoom, index: number) => {
                return (
                    <PlayRoomListLi key={index} >
                        <Link key={index}  to={`/playroom/${item.id}`}>{index} {item.owner.email}の部屋</Link>
                    </PlayRoomListLi>)
            })}

        </PlayRoomListUl>
    );

};

export default PlayRoomsListComponent;

const PlayRoomListUl = styled.ul`
  padding-inline-start: 0px;

`;

const PlayRoomListLi = styled.li`
  box-sizing: border-box;
  display: block;
  padding: 10px;
  list-style: none;
  font-size: 16px;
  border-bottom: #eee solid;
  border-width: thin; 
  :first-child {
    border-top: ${config().style.color.border} solid;  
    border-width: thin; 
  }
  
`;
