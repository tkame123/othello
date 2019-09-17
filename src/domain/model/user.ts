import {createId} from "../../util/id";

export enum AuthStateType {
    UNKNOWN = 0,
    INITIALIZING = 1,
    LOGIN_USER = 2,
    GUEST = 3,
}

export class User {

    public static New(email: string): User {
        return new User(
            createId(),
            email,
        );
    }

    public static From(id: string, email: string): User {
        return new User(
            id,
            email,
        );
    }

    constructor(public readonly id: string,
                public readonly email: string,) {}

}
