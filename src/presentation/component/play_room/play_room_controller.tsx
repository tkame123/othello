import React from 'react';
import styled from "styled-components";
import Button from "../common/button";

import {config} from "../../../util/config";
import {PlayRoom} from "../../../domain/model/play_room";

interface IProps {
    playRoom: PlayRoom;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomControllerComponent: React.FC<IProps> = (props) => {

    const {playRoom, handleCreateNewGame} = props;
    const gameId: string | null = playRoom.gameId;

    return (
        <Wrapper>

            <Inner>
                {!gameId && <Button onClick={handleCreateNewGame}>Create Game</Button>}
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

const DeleteButton = styled(Button)`
    padding: 0.5em;
    border-Radius: 3px;
    border-style: none;
    background-color: ${config().style.color.error};
    text-Align: center;
    color: ${config().style.color.onError};
    cursor: pointer;
    &:hover {
      background: ${config().style.color.error};
    }
    &:disabled {
      background-color: ${config().style.color.error};
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        background-color: ${config().style.color.error};
      }
`;
