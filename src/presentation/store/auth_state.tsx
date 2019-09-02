import {User} from "../../domain/model/user";

export type AuthState = {
    user: User | null,
    authState: boolean,
    isLoading: boolean,
};
