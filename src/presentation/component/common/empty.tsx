import * as React from 'react';
import styled from 'styled-components'
import {config} from "../../../util/config"

interface IProps{
}

const EmptyData: React.FC<IProps> = (props) => {

    return (
        <Wrapper>
            <Image className="far fa-folder-open fa-4x" />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position:relative;
    height: 100vh;
`;

const Image = styled.i`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${config().style.color.primaryLight};
`;

export default EmptyData;
