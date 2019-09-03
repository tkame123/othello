export type TParamsScoreFrom  = {
    gameId: string,
    blackPlayer: { userId: string , value: number},
    whitePlayer: { userId: string , value: number},
    updatedAt: Date,
    createdAt: Date,
}


export class Score {

    public static From(from: TParamsScoreFrom): Score {
        return new Score(
            from.gameId,
            from.blackPlayer,
            from.whitePlayer,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly gameId: string,
                public readonly blackPlayer: { userId: string , value: number},
                public readonly whitePlayer: { userId: string , value: number},
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
    ) {}

}
