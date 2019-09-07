import React from 'react';
import styled from "styled-components";
import Button from "../common/button";

interface IProps {
    handleCreatePlayRooms: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayRoomsControllerComponent: React.FC<IProps> = (props) => {

    const {handleCreatePlayRooms} = props;

    return (
        <Wrapper>

            <Inner>
                <Button onClick={handleCreatePlayRooms}>Create PlayRoom</Button>
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
