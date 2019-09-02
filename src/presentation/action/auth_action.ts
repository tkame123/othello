import {Action} from "redux";

import{
    IListenerOnAuthUserActionItem,
    IRequestGetAuthUserActionItem,
    IRequestLoginOnGoogleActionItem,
    IRequestLogoutActionItem,
    ICallbackGetAuthUserActionItem,
    ICallbackLoginOnGoogleActionItem,
    ICallbackLogoutActionItem,
} from "./auth_action_item";

export enum AuthActionType {
    LISTENER_ON_AUTH_USER_AUTH = "AUTH_ROOMS_LISTENER_ON_AUTH_USER",

    REQUEST_GET_AUTH_USER_AUTH = "AUTH_ROOMS_REQUEST_GET_AUTH_USER",
    CALLBACK_GET_AUTH_USER_ROOMS = "AUTH_ROOMS_CALLBACK_GET_AUTH_USER",

    REQUEST_LOGIN_GOOGLE_AUTH = "AUTH_ROOMS_REQUEST_LOGIN_GOOGLE",
    CALLBACK_LOGIN_GOOGLE_ROOMS = "AUTH_ROOMS_CALLBACK_LOGIN_GOOGLE",

    REQUEST_LOGOUT_AUTH = "AUTH_ROOMS_REQUEST_LOGOUT",
    CALLBACK_LOGOUT_ROOMS = "AUTH_ROOMS_CALLBACK_LOGUT",

}

export interface IListenerOnAuthUserAction extends Action {
    type: AuthActionType.LISTENER_ON_AUTH_USER_AUTH;
    isSuccess: boolean;
    item?: IListenerOnAuthUserActionItem;
}

export interface IRequestGetAuthUserAction extends Action {
    type: AuthActionType.REQUEST_GET_AUTH_USER_AUTH;
    item: IRequestGetAuthUserActionItem;
}
export interface ICallbackGetAuthUserAction extends Action {
    type: AuthActionType.CALLBACK_GET_AUTH_USER_ROOMS;
    isSuccess: boolean;
    item?: ICallbackGetAuthUserActionItem;
}

export interface IRequestLoginOnGoogleAction extends Action {
    type: AuthActionType.REQUEST_LOGIN_GOOGLE_AUTH;
    item: IRequestLoginOnGoogleActionItem;
}
export interface ICallbackLoginOnGoogleAction extends Action {
    type: AuthActionType.CALLBACK_LOGIN_GOOGLE_ROOMS;
    isSuccess: boolean;
    item?: ICallbackLoginOnGoogleActionItem;
}

export interface IRequestLogoutAction extends Action {
    type: AuthActionType.REQUEST_LOGOUT_AUTH;
    item: IRequestLogoutActionItem;
}
export interface ICallbackLogoutAction extends Action {
    type: AuthActionType.CALLBACK_LOGOUT_ROOMS;
    isSuccess: boolean;
    item?: ICallbackLogoutActionItem;
}

export type AuthAction =
    IListenerOnAuthUserAction |
    IRequestGetAuthUserAction |
    IRequestLoginOnGoogleAction |
    IRequestLogoutAction |
    ICallbackGetAuthUserAction |
    ICallbackLoginOnGoogleAction |
    ICallbackLogoutAction ;

export interface IAuthActionCreator {

    listenerOnAuthUserAction(
        isSuccess: boolean,
        item?: IListenerOnAuthUserActionItem,
    ): IListenerOnAuthUserAction;

    requestGetAuthUserAction(
        item: IRequestGetAuthUserActionItem,
    ): IRequestGetAuthUserAction;
    callbackGetAuthUserAction(
        isSuccess: boolean,
        item?: ICallbackGetAuthUserActionItem,
    ): ICallbackGetAuthUserAction;

    requestLoginOnGoogleAction(
        item: IRequestLoginOnGoogleActionItem,
    ): IRequestLoginOnGoogleAction;
    callbackLoginOnGoogleAction(
        isSuccess: boolean,
        item?: ICallbackLoginOnGoogleActionItem,
    ): ICallbackLoginOnGoogleAction;

    requestLogoutAction(
        item: IRequestLogoutActionItem,
    ): IRequestLogoutAction;
    callbackLogoutAction(
        isSuccess: boolean,
        item?: ICallbackLogoutActionItem,
    ): ICallbackLogoutAction;

}

class ActionCreator implements IAuthActionCreator {

    public listenerOnAuthUserAction = (
        isSuccess: boolean,
        item?: IListenerOnAuthUserActionItem,
    ): IListenerOnAuthUserAction => {
        return {
            type: AuthActionType.LISTENER_ON_AUTH_USER_AUTH,
            isSuccess,
            item,
        };
    };

    public requestGetAuthUserAction = (
        item: IRequestGetAuthUserActionItem,
    ): IRequestGetAuthUserAction => {
        return {
            type: AuthActionType.REQUEST_GET_AUTH_USER_AUTH,
            item,
        };
    };
    public callbackGetAuthUserAction = (
        isSuccess: boolean,
        item?: ICallbackGetAuthUserActionItem,
    ): ICallbackGetAuthUserAction => {
        return {
            type: AuthActionType.CALLBACK_GET_AUTH_USER_ROOMS,
            isSuccess,
            item,
        };
    };

    public requestLoginOnGoogleAction = (
        item: IRequestLoginOnGoogleActionItem,
    ): IRequestLoginOnGoogleAction => {
        return {
            type: AuthActionType.REQUEST_LOGIN_GOOGLE_AUTH,
            item,
        };
    };
    public callbackLoginOnGoogleAction = (
        isSuccess: boolean,
        item?: ICallbackLoginOnGoogleActionItem,
    ): ICallbackLoginOnGoogleAction => {
        return {
            type: AuthActionType.CALLBACK_LOGIN_GOOGLE_ROOMS,
            isSuccess,
            item,
        };
    };

    public requestLogoutAction = (
        item: IRequestLogoutActionItem,
    ): IRequestLogoutAction => {
        return {
            type: AuthActionType.REQUEST_LOGOUT_AUTH,
            item,
        };
    };
    public callbackLogoutAction = (
        isSuccess: boolean,
        item?: ICallbackLogoutActionItem,
    ): ICallbackLogoutAction => {
        return {
            type: AuthActionType.CALLBACK_LOGOUT_ROOMS,
            isSuccess,
            item,
        };
    };

}

export const createAuthActionCreator = (): IAuthActionCreator => {
    return new ActionCreator();
};
