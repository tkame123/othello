import {Board, State} from "./board";

export type Player = State.State_Black | State.State_White ;
export type GameTree ={board: Board, player: Player, moves: Move[], turn: number}
export type Cell = {x: number, y: number}
export type Move = {isPassingMove: boolean, cell: Cell | null, gameTreePromise: GameTree | null};
export type Score = { whiteScore: number, blackScore: number }

export type TParamsGameDetailFrom  = {
    id: string,
    turn: number,
    cell: Cell,
    updatedAt: Date,
    createdAt: Date,
}

export class GameDetail {

    public static From(from: TParamsGameDetailFrom): GameDetail {
        return new GameDetail(
            from.id,
            from.turn,
            from.cell,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly turn: number,
                public readonly cell: Cell,
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
    ) {}

}
