import React from 'react';
import styled from "styled-components";
import {PlayRoom} from "../../../domain/model/play_room";
import {Link} from "react-router-dom";
import {config} from "../../../util/config";

interface IProps {
    myPlayRooms: PlayRoom[];
    opponentPlayRooms: PlayRoom[];
}

const PlayRoomsListComponent: React.FC<IProps> = (props) => {

    const {myPlayRooms, opponentPlayRooms} = props;

    return (
        <Wrapper>

            <Title>MyRoom</Title>
            <PlayRoomListUl>
                {myPlayRooms.map((item: PlayRoom, index: number) => {
                    return (
                        <PlayRoomListLi key={index} >
                            <PlayRoomCard>
                                {item.gameId !== null && "Playing" } <br/>
                                {`createdAt: ${item.createdAt.toLocaleTimeString()} ${item.createdAt.toLocaleDateString()}`} <br/>
                                {`owner: ${item.owner.email}`} <br/>
                                <PlayRoomLink key={index}  to={`/playroom/${item.id}`}/>
                            </PlayRoomCard>
                        </PlayRoomListLi>)
                })}
            </PlayRoomListUl>

            <Title>PlayRooms</Title>
            <PlayRoomListUl>
                {opponentPlayRooms.map((item: PlayRoom, index: number) => {
                    return (
                        <PlayRoomListLi key={index} >
                            <PlayRoomCard>
                                {`createdAt: ${item.createdAt.toLocaleTimeString()} ${item.createdAt.toLocaleDateString()}`} <br/>
                                {`owner: ${item.owner.email}`} <br/>
                                <PlayRoomLink key={index}  to={`/playroom/${item.id}`}/>
                            </PlayRoomCard>
                        </PlayRoomListLi>)
                })}
            </PlayRoomListUl>
        </Wrapper>
    );

};

export default PlayRoomsListComponent;

const Wrapper = styled.div`
      margin-left: auto;
      margin-right: auto;
      width: 70%;
      padding: 0 0 0 10px;
      @media screen and (max-width: 812px) {
        width: 100%;
      }
`;

const Title = styled.div`
      text-align: left;
      font-family: 'Amatic SC', cursive;
`;

const PlayRoomListUl = styled.ul`
      padding-inline-start: 0px;
`;

const PlayRoomListLi = styled.li`
      box-sizing: border-box;
      display: block;
      list-style: none;
      font-size: 16px;
      border-bottom: #eee solid;
      border-width: thin; 
      :first-child {
        border-top: ${config().style.color.border} solid;  
        border-width: thin; 
      }
`;

const PlayRoomCard = styled.div`
      padding: 10px;
      position: relative;
`;

const PlayRoomLink = styled(Link)`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; 
      &:hover {
        opacity: 0.1;
        background-color: ${config().style.color.primary};
      }
`;
