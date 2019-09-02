import React from 'react';
// import styled, {css} from "styled-components";
import Progress from "../common/progress";

interface IProps {
    isLoading: boolean;
    handleCreatePlayRooms: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomsControllerComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {handleCreatePlayRooms} = props;

    return (
        <>
            {isLoading && <Progress/>}

            <button onClick={handleCreatePlayRooms}>New PlayRoom</button>

        </>
    );

};


export default PlayRoomsControllerComponent;
