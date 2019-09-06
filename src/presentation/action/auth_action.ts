import {Action} from "redux";

import{
    IListenerOnAuthUserActionItem,
    IRequestInitAuthUserActionItem,
    IRequestFinalAuthUserActionItem,
    IRequestGetAuthUserActionItem,
    IRequestLoginOnGoogleActionItem,
    IRequestLogoutActionItem,
    ICallbackInitAuthUserActionItem,
    ICallbackFinalAuthUserActionItem,
    ICallbackGetAuthUserActionItem,
    ICallbackLoginOnGoogleActionItem,
    ICallbackLogoutActionItem,
} from "./auth_action_item";

export enum AuthActionType {
    LISTENER_ON_AUTH_USER_AUTH = "AUTH_LISTENER_ON_AUTH_USER",

    REQUEST_INIT_AUTH_USER_AUTH = "AUTH_REQUEST_INIT_AUTH_USER",
    CALLBACK_INIT_AUTH_USER_ROOMS = "AUTH_CALLBACK_INIT_AUTH_USER",

    REQUEST_FINAL_AUTH_USER_AUTH = "AUTH_REQUEST_FINAL_AUTH_USER",
    CALLBACK_FINAL_AUTH_USER = "AUTH_CALLBACK_FINAL_AUTH_USER",

    REQUEST_GET_AUTH_USER_AUTH = "AUTH_REQUEST_GET_AUTH_USER",
    CALLBACK_GET_AUTH_USER_AUTH = "AUTH_CALLBACK_GET_AUTH_USER",

    REQUEST_LOGIN_GOOGLE_AUTH = "AUTH_REQUEST_LOGIN_GOOGLE",
    CALLBACK_LOGIN_GOOGLE_AUTH = "AUTH_CALLBACK_LOGIN_GOOGLE",

    REQUEST_LOGOUT_AUTH = "AUTH_REQUEST_LOGOUT",
    CALLBACK_LOGOUT_AUTH = "AUTH_CALLBACK_LOGOUT",

}

export interface IListenerOnAuthUserAction extends Action {
    type: AuthActionType.LISTENER_ON_AUTH_USER_AUTH;
    isSuccess: boolean;
    item?: IListenerOnAuthUserActionItem;
}

export interface IRequestInitAuthUserAction extends Action {
    type: AuthActionType.REQUEST_INIT_AUTH_USER_AUTH;
    item: IRequestInitAuthUserActionItem;
}
export interface ICallbackInitAuthUserAction extends Action {
    type: AuthActionType.CALLBACK_INIT_AUTH_USER_ROOMS;
    isSuccess: boolean;
    item?: ICallbackInitAuthUserActionItem;
}

export interface IRequestFinalAuthUserAction extends Action {
    type: AuthActionType.REQUEST_FINAL_AUTH_USER_AUTH;
    item: IRequestFinalAuthUserActionItem;
}
export interface ICallbackFinalAuthUserAction extends Action {
    type: AuthActionType.CALLBACK_FINAL_AUTH_USER;
    isSuccess: boolean;
    item?: ICallbackFinalAuthUserActionItem;
}

export interface IRequestGetAuthUserAction extends Action {
    type: AuthActionType.REQUEST_GET_AUTH_USER_AUTH;
    item: IRequestGetAuthUserActionItem;
}
export interface ICallbackGetAuthUserAction extends Action {
    type: AuthActionType.CALLBACK_GET_AUTH_USER_AUTH;
    isSuccess: boolean;
    item?: ICallbackGetAuthUserActionItem;
}

export interface IRequestLoginOnGoogleAction extends Action {
    type: AuthActionType.REQUEST_LOGIN_GOOGLE_AUTH;
    item: IRequestLoginOnGoogleActionItem;
}
export interface ICallbackLoginOnGoogleAction extends Action {
    type: AuthActionType.CALLBACK_LOGIN_GOOGLE_AUTH;
    isSuccess: boolean;
    item?: ICallbackLoginOnGoogleActionItem;
}

export interface IRequestLogoutAction extends Action {
    type: AuthActionType.REQUEST_LOGOUT_AUTH;
    item: IRequestLogoutActionItem;
}
export interface ICallbackLogoutAction extends Action {
    type: AuthActionType.CALLBACK_LOGOUT_AUTH;
    isSuccess: boolean;
    item?: ICallbackLogoutActionItem;
}

export type AuthAction =
    IListenerOnAuthUserAction |
    IRequestInitAuthUserAction |
    IRequestFinalAuthUserAction |
    IRequestGetAuthUserAction |
    IRequestLoginOnGoogleAction |
    IRequestLogoutAction |
    ICallbackInitAuthUserAction |
    ICallbackFinalAuthUserAction |
    ICallbackGetAuthUserAction |
    ICallbackLoginOnGoogleAction |
    ICallbackLogoutAction ;

export interface IAuthActionCreator {

    listenerOnAuthUserAction(
        isSuccess: boolean,
        item?: IListenerOnAuthUserActionItem,
    ): IListenerOnAuthUserAction;

    requestInitAuthUserAction(
        item: IRequestInitAuthUserActionItem,
    ): IRequestInitAuthUserAction;
    callbackInitAuthUserAction(
        isSuccess: boolean,
        item?: ICallbackInitAuthUserActionItem,
    ): ICallbackInitAuthUserAction;

    requestFinalAuthUserAction(
        item: IRequestFinalAuthUserActionItem,
    ): IRequestFinalAuthUserAction;
    callbackFinalAuthUserAction(
        isSuccess: boolean,
        item?: ICallbackFinalAuthUserActionItem,
    ): ICallbackFinalAuthUserAction;

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

    public requestInitAuthUserAction = (
        item: IRequestInitAuthUserActionItem,
    ): IRequestInitAuthUserAction => {
        return {
            type: AuthActionType.REQUEST_INIT_AUTH_USER_AUTH,
            item,
        };
    };
    public callbackInitAuthUserAction = (
        isSuccess: boolean,
        item?: ICallbackInitAuthUserActionItem,
    ): ICallbackInitAuthUserAction => {
        return {
            type: AuthActionType.CALLBACK_INIT_AUTH_USER_ROOMS,
            isSuccess,
            item,
        };
    };

    public requestFinalAuthUserAction = (
        item: IRequestFinalAuthUserActionItem,
    ): IRequestFinalAuthUserAction => {
        return {
            type: AuthActionType.REQUEST_FINAL_AUTH_USER_AUTH,
            item,
        };
    };
    public callbackFinalAuthUserAction = (
        isSuccess: boolean,
        item?: ICallbackFinalAuthUserActionItem,
    ): ICallbackFinalAuthUserAction => {
        return {
            type: AuthActionType.CALLBACK_FINAL_AUTH_USER,
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
            type: AuthActionType.CALLBACK_GET_AUTH_USER_AUTH,
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
            type: AuthActionType.CALLBACK_LOGIN_GOOGLE_AUTH,
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
            type: AuthActionType.CALLBACK_LOGOUT_AUTH,
            isSuccess,
            item,
        };
    };

}

export const createAuthActionCreator = (): IAuthActionCreator => {
    return new ActionCreator();
};
