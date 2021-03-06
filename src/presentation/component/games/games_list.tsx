import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Game, GameStatus} from "../../../domain/model/game";
import {config} from "../../../util/config";

interface IProps {
    games: Game[];
}

const GamesListComponent: React.FC<IProps> = (props) => {

    const {games} = props;

    return (
        <GameListUl>

            {games.map((item: Game, index: number) => {
                return (
                        <GameListLi key={index} >
                            <Link key={index} to={`/game/${item.id}`}> {GameStatus[item.gameStatus]} </Link>
                        </GameListLi>
                    )
            })}

        </GameListUl>
    );

};

export default GamesListComponent;

const GameListUl = styled.ul`
  padding-inline-start: 0px;

`;

const GameListLi = styled.li`
  box-sizing: border-box;
  display: block;
  padding: 10px;
  list-style: none;
  font-size: 16px;
  border-bottom: #eee solid;
  border-width: thin; 
  :first-child {
    border-top: ${config().style.color.border} solid;  
    border-width: thin; 
  }
  
`;
