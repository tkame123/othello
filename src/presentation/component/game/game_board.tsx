import React from 'react';
import styled, {css} from "styled-components";
import {Board, State} from "../../../domain/model/board";
import {Cell, GameDetail, GameTree} from "../../../domain/model/game_detail";

interface IProps {
    isPlayer: boolean;
    isMyTurn: boolean;
    boardSize: number;
    gameTree: GameTree;
    gameDetails: GameDetail[];
    handleToggleBoard: (cell: Cell, isPlayer: boolean, isMyTurn: boolean) => (event: React.MouseEvent<HTMLTableDataCellElement>) => void;
}

const GameBoardComponent: React.FC<IProps> = (props) => {

    const {boardSize, isPlayer, isMyTurn, gameTree, gameDetails, handleToggleBoard} = props;

    const board: Board = gameTree.board;

    return (
        <>
            <BoardTable>
                <tbody>

                {
                    [...Array(boardSize)].map((item, y) =>{
                        return (
                            <tr key={y}>
                                {
                                    [...Array(boardSize)].map((item, x) => {
                                        const cell: Cell = {x: x, y: y};
                                        let isLastMove: boolean = false;
                                        if (gameDetails[gameDetails.length -1]) {
                                            const lastCell: Cell = gameDetails[gameDetails.length -1].cell;
                                            isLastMove = ( (lastCell.x === cell.x) && (lastCell.y === cell.y) );
                                        }
                                        return (
                                            <BoardCell
                                                key={x}
                                                onClick={handleToggleBoard(cell, isPlayer, isMyTurn)}
                                                isLastMove={isLastMove}>
                                                <Disk state={board.boardState[[x, y].toString()]} />
                                            </BoardCell>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }

                </tbody>
            </BoardTable>

        </>
    );

};


export default GameBoardComponent;

const BoardTable = styled.table`
  margin-left: auto;
  margin-right: auto;
`;

const BoardCell = styled.td`
    border: 1px solid #ccc;
    padding: 0;
    margin: 0;
    line-height: 0;
    cursor: pointer;
    background: ${(props:{isLastMove: boolean}) => props.isLastMove ? "#1E6C99" : "#090" };
`;

const Disk = styled.span`
    display: inline-block;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin: 0.25em;
    ${(props:{state: State}) => props.state === State.State_Empty && css`
    `}
    ${(props:{state: State}) => props.state === State.State_Black && css`
        background: #000;
    `}
    ${(props:{state: State}) => props.state === State.State_White && css`
        background: #fff;
    `}
`;
