import React from 'react';
import GamesListComponent from "./games_list";
import {Game} from "../../../domain/model/game";
import Progress from "../common/progress";
import EmptyData from "../common/empty";

interface IProps {
    isInit: boolean;
    isLoading: boolean;
    games: Game[];
}

const GamesComponent: React.FC<IProps> = (props) => {

    const {isInit, isLoading, games} = props;

    if (isInit) { return <Progress/>}

    return (
        <>
            { !isLoading && games.length === 0 && <EmptyData/> }
            { !isLoading && games.length !== 0 && (
                <GamesListComponent
                    games={games}
                />)
            }
        </>
    );

};


export default GamesComponent;
