import {User} from "./user";

export enum GameStatus {
    GameStatus_Unknown = 0,
    GameStatus_Playing = 1,
    GameStatus_isPassingMove = 2,
    GameStatus_End = 3,
}

export type TParamsGameFrom  = {
    id: string,
    playerBlack: User,
    playerWhite: User,
    gameStatus: GameStatus,
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
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly playerBlack: User,
                public readonly playerWhite: User,
                public readonly gameStatus: GameStatus,
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
                ) {}

}
