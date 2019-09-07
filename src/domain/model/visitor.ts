export type TParamsVisitorFrom  = {
    userId: string,
    playRoomId: string |null,
    updatedAt: Date;
    createdAt: Date;
}

export class Visitor {

    public static From(from: TParamsVisitorFrom): Visitor {
        return new Visitor(
            from.userId,
            from.playRoomId,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly userId: string,
                public readonly playRoomId: string | null,
                public readonly updatedAt: Date,
                public readonly createdAt: Date) {}
}
