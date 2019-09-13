import React from 'react';
import styled from "styled-components";

import {PlayRoom} from "../../../domain/model/play_room";
import {User} from "../../../domain/model/user";
import {Visitor} from "../../../domain/model/visitor";

import {config} from "../../../util/config";

import PlayRoomModalVoteComponent from "./play_room_modal_vote";

interface IProps {
    isModalForVoteGameReady: boolean;
    playRoom: PlayRoom;
    visitors: Visitor[];
    user: User | null
    handleUpdatePlayRoomPlayer: (playerBlack: User | null, playerWhite: User |null ) => (event: React.MouseEvent<HTMLDivElement>) => void;
    handleVoteGameReadyCreate: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCancelGameReady: (event: (React.MouseEvent | React.KeyboardEvent)) => void;
}

const PlayRoomControllerComponent: React.FC<IProps> = (props) => {

    const {isModalForVoteGameReady, user, playRoom, handleUpdatePlayRoomPlayer, handleVoteGameReadyCreate, handleCancelGameReady} = props;

    if (!user) {throw new Error("No User")}

    return (
        <Wrapper>

            <Inner>
                <PlayerWrapper>
                    <PlayerTitle>#Black</PlayerTitle>
                    {playRoom.playerBlack
                        ? <><PlayerExist onClick={handleUpdatePlayRoomPlayer(null, playRoom.playerWhite)}>{playRoom.playerBlack.email}</PlayerExist></>
                        : <><PlayerNonExist onClick={handleUpdatePlayRoomPlayer(user, playRoom.playerWhite)} >Empty</PlayerNonExist></>
                    }
                </PlayerWrapper>

                <PlayerWrapper>
                    <PlayerTitle>#White</PlayerTitle>
                    {playRoom.playerWhite
                        ? <><PlayerExist onClick={handleUpdatePlayRoomPlayer(playRoom.playerBlack, null)}>{playRoom.playerWhite.email}</PlayerExist></>
                        : <><PlayerNonExist onClick={handleUpdatePlayRoomPlayer(playRoom.playerBlack, user)} >Empty</PlayerNonExist></>
                    }
                </PlayerWrapper>

                <PlayRoomModalVoteComponent
                    isModalForVoteGameReady={isModalForVoteGameReady}
                    handleVoteGameReadyCreate={handleVoteGameReadyCreate}
                    handleCancelGameReady={handleCancelGameReady}
                />

            </Inner>

        </Wrapper>
    );

};

export default PlayRoomControllerComponent;

const Wrapper = styled.div`
    margin: 10px auto;
    width: 400px;
    @media screen and (max-width: 812px) {
      width: 100%;
    }
`;

const Inner = styled.div`
    display: flex;
    justify-content: space-around;
`;

const PlayerWrapper = styled.div`
    box-sizing: border-box;
    width: 160px;
    height: 60px;
    border: solid thin ${config().style.color.border};
    color: ${config().style.color.primaryDark};
    background-color: ${config().style.color.secondaryLight};
`;

const PlayerTitle = styled.div`
    box-sizing: border-box;
    padding: 0px 5px;
    width: 100%;
    height: 20px;
    color: ${config().style.color.onPrimary};
    background-color: ${config().style.color.primary};
`;

const PlayerNonExist = styled.div`
    box-sizing: border-box;
    padding: 0px 5px;
    width: 100%;
    height: 40px;
    text-align: left;
    line-height: 40px;
    color: ${config().style.color.primaryDark};
    background-color: ${config().style.color.secondaryLight};
`;


const PlayerExist = styled.div`
    box-sizing: border-box;
    padding: 0px 5px;
    width: 100%;
    height: 40px;
    text-align: left;
    line-height: 40px;
    color: ${config().style.color.onsurface};
    background-color: ${config().style.color.surface};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

