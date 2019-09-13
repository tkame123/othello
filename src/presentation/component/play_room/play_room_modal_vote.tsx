import React from 'react';
import {Modal} from "../common/modal";
import Button from "../common/button";

interface IProps {
    isModalForVoteGameReady: boolean,
    handleVoteGameReadyCreate: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCancelGameReady: (event: (React.MouseEvent | React.KeyboardEvent)) => void;
}

const PlayRoomModalVoteComponent: React.FC<IProps> = (props) => {

    const {isModalForVoteGameReady, handleVoteGameReadyCreate, handleCancelGameReady} = props;

    return (
        <Modal
            isOpen={isModalForVoteGameReady}
            onRequestClose={handleCancelGameReady}
            contentLabel="Vote Modal"
        >
            <Button onClick={handleVoteGameReadyCreate}>Are You Ready?</Button>
        </Modal>
    );

};

export default PlayRoomModalVoteComponent;
