import React from 'react';
import {PlayRoom} from "../../../domain/model/play_room";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {config} from "../../../util/config";
import {Visitor} from "../../../domain/model/visitor";

interface IProps {
    playRoom: PlayRoom;
    visitors: Visitor[];
}

const PlayRoomInfoComponent: React.FC<IProps> = (props) => {

    const {playRoom, visitors} = props;
    const gameId: string | null = playRoom.gameId;

    return (
        <Wrapper>

            <Title>Room Information</Title>

            <PlayRoomCard>
                {`createdAt: ${playRoom.createdAt.toLocaleTimeString()} ${playRoom.createdAt.toLocaleDateString()}`} <br/>
                {gameId && "You can Play Game, Click this"}
                {gameId && <PlayRoomLink to={`/game/${gameId}`} />}
                <br/><br/>
                Now visitors: {visitors.length}
                <br/><br/>

            </PlayRoomCard>

        </Wrapper>
    );

};

export default PlayRoomInfoComponent;

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
