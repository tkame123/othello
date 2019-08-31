import {createId} from "../../util/id";
import {Board, State} from "./board";
import {User} from "./user";

export enum GameStatus {
    GameStatus_Unknown = 0,
    GameStatus_Playing = 1,
    GameStatus_isPassingMove = 2,
    GameStatus_End = 3,
}
export type Player = State.State_White | State.State_Black;
export type GameTree ={board: Board, player: Player, moves: Move[], nest: number}
export type Cell = {x: number, y: number}
export type Move = {isPassingMove: boolean, cell: Cell | null, gameTreePromise: GameTree | null};

export class Game {

    public static New(playerWhite: User, playerBlack: User): Game {
        return new Game(
            createId(),
            Board.New(),
            playerWhite,
            playerBlack,
            GameStatus.GameStatus_Playing,
            new Date(),
        );
    }

    public static From(id: string, board: Board, playerWhite: User, playerBlack: User, gameStatus: GameStatus, createdAt: Date): Game {
        return new Game(
            id,
            board,
            playerWhite,
            playerBlack,
            gameStatus,
            createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly board: Board,
                public readonly playerWhite: User,
                public readonly playerBlack: User,
                public readonly gameStatus: GameStatus,
                public readonly createdAt: Date) {
    }

}
