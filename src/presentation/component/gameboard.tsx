import React from 'react';
import styled, {css} from "styled-components";
import {Board, State} from "../../domain/model/board";
import {Game, GameTree, Move, Score} from "../../domain/model/game";
import Progress from "./common/progress";

interface IProps {
    isLoading: boolean;
    size: number;
    game: Game;
    score: Score | null;
    gameTree: GameTree;
    handleCreateNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleUpdateGameTree: (gameTreePromise: GameTree) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameBoard: React.FC<IProps> = (props) => {

    const {isLoading, size} = props;
    const {game, gameTree, score, handleCreateNewGame, handleUpdateGameTree} = props;

    const board: Board = game.board;

    return (
        <>
            {isLoading && <Progress/>}

            <button onClick={handleCreateNewGame}>New Game</button>

            {score
                ? `白の得点：${score.whiteScore} 黒の得点：${score.blackScore} `
                : gameTree.player === State.State_White ? "白の番です"　: "黒の番です"
            }


            <table>
                <tbody>
                <tr>
                    <Header/>
                    {
                        [...Array(size)].map((item, x) => {
                            return <Header key={x}>{x}</Header>
                        })
                    }
                </tr>

                {
                    [...Array(size)].map((item, y) =>{
                        return (
                            <tr key={y}>
                                <Header>{y}</Header>
                                {
                                    [...Array(size)].map((item, x) => {
                                        return <Cell key={x}><Disk state={board.boardState[[x, y].toString()]}/></Cell>
                                    })
                                }
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>

            {
                // eslint-disable-next-line array-callback-return
                gameTree.moves.map((item: Move, index) => {
                    if (item.cell && item.gameTreePromise) {
                        const x: number = item.cell.x;
                        const y: number = item.cell.y;
                        const value: string = x.toString() + y.toString();

                        return (
                            <button key={index} onClick={handleUpdateGameTree(item.gameTreePromise)}>{value}</button>
                        )
                    }
                })
            }

        </>
    );

};


export default GameBoard;

const Header = styled.th`
  margin: 0;
  padding: 0.125em 0.25em;
  line-height: 100%;
`;

const Cell = styled.td`
  background: #090;
  border: 1px solid #ccc;
  padding: 0;
  margin: 0;
  line-height: 0;
`;

interface ComponentProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
        > {
    state: State;
}
const Disk = styled.span`
    display: inline-block;
    width: 2em;
    height: 2em;
    border-radius: 1em;
    margin: 0.25em;
    ${(props:ComponentProps) => props.state === State.State_Empty && css`
    `}
    ${(props:ComponentProps) => props.state === State.State_Black && css`
    background: #000;
    `}
    ${(props:ComponentProps) => props.state === State.State_White && css`
    background: #fff;
    `}
`;
