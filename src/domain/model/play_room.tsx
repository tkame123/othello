import {Game} from "./game";
import {User} from "./user";
import firebase from 'firebase/app';
import 'firebase/firestore';

export type TParamsPlayRoomsFromFS  = {
    id: string,
    ownerId: string,
    ownerEmail: string,
    game: Game | null,
    updatedAt: firebase.firestore.Timestamp;
    createdAt: firebase.firestore.Timestamp;
}

export class PlayRoom {

    public static FromFS(from: TParamsPlayRoomsFromFS): PlayRoom {
        return new PlayRoom(
            from.id,
            User.From(from.ownerId, from.ownerEmail),
            from.game,
            from.updatedAt.toDate(),
            from.createdAt.toDate(),
        );
    }

    constructor(public readonly id: string,
                public readonly owner: User,
                public readonly game: Game | null,
                public readonly updatedAt: Date,
                public readonly createdAt: Date) {}
}
