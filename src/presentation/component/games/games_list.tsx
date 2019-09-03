import React from 'react';
// import styled, {css} from "styled-components";
import Progress from "../common/progress";
import {Link} from "react-router-dom";
import {Game} from "../../../domain/model/game";

interface IProps {
    isLoading: boolean;
    games: Game[];
}

const GamesListComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {games} = props;

    if (!games.length) {return <div>無い</div>}

    return (
        <>
            {isLoading && <Progress/>}

            {games.map((item: Game, index: number) => {
                return <Link key={index} to={`/game/${item.id}`}>{item.id} {item.gameStatus} </Link>
            })}

        </>
    );

};


export default GamesListComponent;
