import {createId} from "../../util/id";
import {Game} from "./game";
import {User} from "./user";

export class PlayRoom {

    public static New(owner: User): PlayRoom {
        return new PlayRoom(
            createId(),
            owner,
            null,
            new Date(),
        );
    }

    constructor(public readonly id: string,
                public readonly owner: User,
                public readonly game: Game | null,
                public readonly createdAt: Date) {
    }
}
