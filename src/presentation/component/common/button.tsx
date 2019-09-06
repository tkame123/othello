import * as React from 'react';
import styled from 'styled-components'
import {config} from "../../../util/config";

interface IProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{
}

const Button: React.FC<IProps> = (props) => {

    const {...Props} = props;

    return <ButtonStyled {...Props}/>

};

const ButtonStyled = styled.button`
        padding: 0.5em;
        border-Radius: 3px;
        border-style: none;
        background-color: ${config().style.color.secondary};
        text-Align: center;
        color: ${config().style.color.onSecondary};
        cursor: pointer;
        &:hover {
          background: ${config().style.color.secondaryDark};
        }
        &:disabled {
          background-color: ${config().style.color.secondaryLight};
          color: rgba(255, 255, 255, 0.5);
          &:hover {
            background-color: ${config().style.color.secondaryLight};
          }
        `;

export default Button;
