import {Board, State} from "../model/board";
import {Cell, GameTree, Move, Player} from "../model/game_detail";

export interface IGameTreeUseCase {

    makeGameTree(board: Board, player: Player, wasPassed: boolean, turn: number) : GameTree;

    nextGameTree(promise: any): GameTree;

    listPossibleMoves(board: Board, player: Player, wasPassed: boolean, nest :number): Move[];

    completePassingMove(attackingMoves: any[], board: Board, player: Player, wasPassed: boolean, nest: number): Move[];

    listAttackingMoves(board: Board, player: Player, nest: number): Move[];

}

class GameTreeUseCase implements IGameTreeUseCase {

    public nextGameTree = (promise: any): GameTree => {
        return promise();
    };

    private delayMakeGameTree = (expressionAsFunction: () => GameTree): any => {
        let result: any;
        let isEvaluated: boolean = false;

        return () => {
            if (!isEvaluated) {
                result = expressionAsFunction();
                isEvaluated = true;
            }
            return result;
        };
    };

    public makeGameTree = (board: Board, player: Player, wasPassed: boolean, turn: number): GameTree => {
        return {
            board: board,
            player: player,
            moves: this.listPossibleMoves(board, player, wasPassed, turn),
            turn: turn,
        }
    };

    public listPossibleMoves = (board: Board, player: Player, wasPassed: boolean, turn: number): Move[] =>{
        return this.completePassingMove(
            this.listAttackingMoves(board, player, turn),
            board,
            player,
            wasPassed,
            turn,
        )
    };

    public completePassingMove = (attackingMoves: Move[], board: Board, player: Player, wasPassed: boolean, turn: number): Move[] =>{
        if (0 < attackingMoves.length) { return attackingMoves }
        if (!wasPassed) {
            return [{
                isPassingMove: true,
                cell: null,
                gameTreePromise: this.delayMakeGameTree(() => {
                    return this.makeGameTree(
                        board,
                        this.nextPlayer(player),
                        true,
                        turn + 1);
                })
            }]
        }
        return [];
    };

    public listAttackingMoves = (board: Board, player: Player, turn: number): Move[] =>{
        let moves: Move[] = [];

        [...Array(board.boardSize)].forEach((item, y) => {
            [...Array(board.boardSize)].forEach((item, x) => {
                const cell: Cell = {x: x, y: y};
                const vulnerableCells: Cell[] = this.listVulnerableCells(board, cell, player);
                if (this.canAttack(vulnerableCells)) {
                    moves.push({
                        isPassingMove: false,
                        cell: cell,
                        gameTreePromise: this.delayMakeGameTree(() => {
                            return this.makeGameTree(
                                this.makeAttackedBoard(board, cell, player),
                                this.nextPlayer(player),
                                false,
                                turn + 1);
                        }),
                    })
                }
            })
        });

        return moves;
    };

    private nextPlayer = (player: Player): Player => {
        return player === State.State_White ? State.State_Black : State.State_White;
    };

    private canAttack = (cells: Cell[]): number => {
        return cells.length;
    };

    private makeAttackedBoard = (board: Board, cell: Cell, player: Player): Board =>{
        let newBoard: Board = Board.From(board.boardState, board.boardSize);
        let vulnerableCells: Cell[] = this.listVulnerableCells(board, cell, player);
        // 石の置換えの実施
        newBoard.boardState[[(cell.x), (cell.y)].toString()] = player;
        [...Array(vulnerableCells.length)].forEach((item, index) => {
            newBoard.boardState[[(vulnerableCells[index].x), (vulnerableCells[index].y)].toString()] = player;
        });
        return newBoard
    };

    // 盤面に石を設置した際に取得できるCellを算出
    private listVulnerableCells = (board: Board, cell: Cell, player :Player ): Cell[] => {
        let vulnerableCells: Cell[] = [];

        if (board.boardState[[cell.x, cell.y].toString()] !== State.State_Empty ) {return vulnerableCells }

        const opponent: Player = this.nextPlayer(player);

        [-1,0,1].forEach((dx) => {
            [-1,0,1].forEach((dy) => {
                if (dx !== 0 || dy !== 0) {
                    // その他8方向の条件を実施
                    // 相手のCellだった場合再帰的にチェックを行う
                    let x = cell.x + dx;
                    let y = cell.y + dy;
                    let historyCells: Cell[] = [];

                    if (board.boardState[[(x), (y)].toString()] === opponent) {
                        while (board.boardState[[(x), (y)].toString()] === opponent) {
                            historyCells.push({x: x, y: y});
                            x = x + dx;
                            y = y + dy;
                        }

                        // 最終の石が自分だった際に経路のCellをPushする
                        if (board.boardState[[(x), (y)].toString()] === player) {
                            vulnerableCells = vulnerableCells.concat(historyCells);
                        }
                    }

                }
            })
        });

        return vulnerableCells;
    };

}

export const createGameGreeUseCase = (): IGameTreeUseCase => {
    return new GameTreeUseCase();
};
