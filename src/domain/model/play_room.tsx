import {User} from "./user";

export type TParamsPlayRoomFrom  = {
    id: string,
    playerBlack: User | null,
    playerWhite: User | null,
    gameId: string | null,
    updatedAt: Date;
    createdAt: Date;
}

export class PlayRoom {

    public static From(from: TParamsPlayRoomFrom): PlayRoom {
        return new PlayRoom(
            from.id,
            from.playerBlack,
            from.playerWhite,
            from.gameId,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly playerBlack: User | null,
                public readonly playerWhite: User | null,
                public readonly gameId: string | null,
                public readonly updatedAt: Date,
                public readonly createdAt: Date) {}
}
