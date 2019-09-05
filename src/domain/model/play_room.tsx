import {User} from "./user";
import {Game} from "./game";

export type TParamsPlayRoomFrom  = {
    id: string,
    owner: User,
    game: Game | null,
    updatedAt: Date;
    createdAt: Date;
}

export class PlayRoom {

    public static From(from: TParamsPlayRoomFrom): PlayRoom {
        return new PlayRoom(
            from.id,
            from.owner,
            from.game,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly owner: User,
                public readonly game: Game | null,
                public readonly updatedAt: Date,
                public readonly createdAt: Date) {}
}
