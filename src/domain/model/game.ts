import {User} from "./user";

export enum GameStatus {
    GameStatus_Unknown = 0,
    GameStatus_Playing = 1,
    GameStatus_End_Processing = 2,
    GameStatus_Finished = 3,
}

export type TParamsGameFrom  = {
    id: string,
    playerBlack: User,
    playerWhite: User,
    gameStatus: GameStatus,
    boardSize: number,
    updatedAt: Date;
    createdAt: Date;
}

export class Game {

    public static From(from: TParamsGameFrom): Game {
        return new Game(
            from.id,
            from.playerBlack,
            from.playerWhite,
            from.gameStatus,
            from.boardSize,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly playerBlack: User,
                public readonly playerWhite: User,
                public readonly gameStatus: GameStatus,
                public readonly boardSize: number,
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
                ) {}

}
