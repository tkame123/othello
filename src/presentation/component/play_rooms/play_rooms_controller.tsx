import React from 'react';
import styled from "styled-components";
import Button from "../common/button";

import {config} from "../../../util/config";
import {PlayRoom} from "../../../domain/model/play_room";

interface IProps {
    myPlayRooms: PlayRoom[];
    handleCreatePlayRooms: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleDeletePlayRooms: (playRooms: PlayRoom[]) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomsControllerComponent: React.FC<IProps> = (props) => {

    const {myPlayRooms, handleCreatePlayRooms, handleDeletePlayRooms} = props;

    const hasMyPlayRoom: boolean = myPlayRooms.length > 0;

    return (
        <Wrapper>

            <Inner>
                {!hasMyPlayRoom && <Button onClick={handleCreatePlayRooms}>Create PlayRoom</Button>}
                {hasMyPlayRoom && <DeleteButton onClick={handleDeletePlayRooms(myPlayRooms)}>Delete PlayRoom</DeleteButton>}
            </Inner>

        </Wrapper>
    );

};

export default PlayRoomsControllerComponent;

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
