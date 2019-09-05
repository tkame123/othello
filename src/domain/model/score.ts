export type TParamsScoreFrom  = {
    gameId: string,
    playerBlack: { id: string , value: number},
    playerWhite: { id: string , value: number},
    boardSize: number,
    updatedAt: Date,
    createdAt: Date,
}


export class Score {

    public static From(from: TParamsScoreFrom): Score {
        return new Score(
            from.gameId,
            from.playerBlack,
            from.playerWhite,
            from.boardSize,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly gameId: string,
                public readonly playerBlack: { id: string , value: number},
                public readonly playerWhite: { id: string , value: number},
                public readonly boardSize: number,
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
    ) {}

}
