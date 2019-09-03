import React from 'react';
import GamesListComponent from "./games_list";
import {Game} from "../../../domain/model/game";

interface IProps {
    isLoading: boolean;
    games: Game[];
}

const GamesComponent: React.FC<IProps> = (props) => {

    const {isLoading} = props;
    const {games} = props;

    return (
        <>
            <GamesListComponent
                isLoading={isLoading}
                games={games}
            />
        </>
    );

};


export default GamesComponent;
