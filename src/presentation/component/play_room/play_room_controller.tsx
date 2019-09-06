import React from 'react';
import styled from "styled-components";
import Button from "../common/button";

import {PlayRoom} from "../../../domain/model/play_room";

interface IProps {
    playRoom: PlayRoom;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomControllerComponent: React.FC<IProps> = (props) => {

    const {playRoom, handleCreateNewGame} = props;
    return (
        <Wrapper>

            <Inner>
                {!playRoom.gameId && <Button onClick={handleCreateNewGame}>Create Game</Button>}
            </Inner>

        </Wrapper>
    );

};

export default PlayRoomControllerComponent;

const Wrapper = styled.div`
    margin: 10px auto;
    width: 70%;
    @media screen and (max-width: 812px) {
      width: 100%;
    }
`;

const Inner = styled.div`
    position: relative;
    top: 10px;
    height: 2em;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;
