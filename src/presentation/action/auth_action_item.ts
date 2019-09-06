import {User} from "../../domain/model/user";

export interface IListenerOnAuthUserActionItem {
    user: User | null,
    authState: boolean,
}

export interface IRequestInitAuthUserActionItem {
}
export interface ICallbackInitAuthUserActionItem {
}

export interface IRequestFinalAuthUserActionItem {
}
export interface ICallbackFinalAuthUserActionItem {
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
