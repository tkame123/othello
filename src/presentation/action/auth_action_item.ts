import {User} from "../../domain/model/user";

export interface ICallbackOnAuthUserActionItem {
    user: User | null,
    authState: boolean,
}

export interface IRequestGetAuthUserActionItem {
}
export interface ICallbackGetAuthUserActionItem {
    user: User | null,
    authState: boolean,
}

export interface IRequestLoginOnGoogleActionItem {
}
export interface ICallbackLoginOnGoogleActionItem {
}

export interface IRequestLogoutActionItem {
}
export interface ICallbackLogoutActionItem {
}
