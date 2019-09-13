import * as React from 'react';
import styled from 'styled-components'

interface IProps{
}

const EmptyData: React.FC<IProps> = (props) => {

    return (
        <Wrapper>
            <Title>Empty Data</Title>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position:relative;
    height: 100vh;
`;

const Title = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Amatic SC', cursive;
    font-size: 18px;
`;

export default EmptyData;
