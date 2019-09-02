import {createId} from "../../util/id";

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
