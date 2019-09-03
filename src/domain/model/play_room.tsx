import {User} from "./user";

export type TParamsPlayRoomFrom  = {
    id: string,
    owner: User,
    gameId: string | null,
    updatedAt: Date;
    createdAt: Date;
}

export class PlayRoom {

    public static From(from: TParamsPlayRoomFrom): PlayRoom {
        return new PlayRoom(
            from.id,
            from.owner,
            from.gameId,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly owner: User,
                public readonly gameId: string | null,
                public readonly updatedAt: Date,
                public readonly createdAt: Date) {}
}
