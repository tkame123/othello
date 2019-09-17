import {User, AuthStateType} from "../../domain/model/user";

export type AuthState = {
    user: User | null,
    authState: AuthStateType,
    isLoading: boolean,
};
