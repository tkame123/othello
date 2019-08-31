import {createId} from "../../util/id";

export class User {

    public static New(email: string): User {
        return new User(
            createId(),
            email,
            new Date(),
        );
    }

    constructor(public readonly id: string,
                public readonly email: string,
                public readonly createdAt: Date) {
    }

}
