import * as React from 'react';
import styled from 'styled-components'
import {config} from "../../../util/config"

interface IProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
        > {
}

const Progress: React.FC<IProps> = (props) => {

    return (
        <Wrapper>
            <Indicator />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${config().style.zindex.progress};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 1s, visibility 1s;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 1;
`;

const Indicator = styled.div`
    width: 30px; /*ローディングアイコンの横サイズ*/
    height: 30px; /*ローディングアイコンの縦サイズ*/
    border-radius: 50%; /*CSS3で円を書く*/
    border: 4px solid ${config().style.color.primary}; /*円に○の枠をつける*/
    border-right-color: transparent; /*円の右にC状の空きをつける*/
    animation: spin 1s linear infinite; /*1秒毎にくるくる回転するアニメーション*/
    @keyframes spin {
        /*0%の時は20％の透明度*/
        0% {
            transform: rotate(0deg);
            opacity: 0.2;
        }
    
        /*50%の時は透明度なし*/
        50% {
            transform: rotate(180deg);
            opacity: 1.0;
        }
    
        /*100%の時に20％の透明度に戻る*/
        100% {
            transform: rotate(360deg);
            opacity: 0.2;
        }
    
    }

`;

export default Progress;
