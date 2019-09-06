import {Action} from "redux";
import {IAuthActionCreator} from "../action/auth_action";

import {
    IRequestInitAuthUserActionItem,
    IRequestFinalAuthUserActionItem,
    IRequestGetAuthUserActionItem,
    IRequestLoginOnGoogleActionItem,
    IRequestLogoutActionItem,
} from "../action/auth_action_item"

export interface IAuthDispatcher {

    initAuthUser(item: IRequestInitAuthUserActionItem): void;

    finalAuthUser(item: IRequestFinalAuthUserActionItem): void;

    getAuthUser(item: IRequestGetAuthUserActionItem): void;

    loginOnGoogle(item: IRequestLoginOnGoogleActionItem): void;

    logout(item: IRequestLogoutActionItem): void;

}

class Dispatcher implements IAuthDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IAuthActionCreator) {};

    public initAuthUser = (item: IRequestInitAuthUserActionItem,): void => {
        this.dispatch(this.actionCreator.requestInitAuthUserAction(item));};

    public finalAuthUser = (item: IRequestFinalAuthUserActionItem,): void => {
        this.dispatch(this.actionCreator.requestFinalAuthUserAction(item));};

    public getAuthUser = (item: IRequestGetAuthUserActionItem,): void => {
        this.dispatch(this.actionCreator.requestGetAuthUserAction(item));};

    public loginOnGoogle = (item: IRequestLoginOnGoogleActionItem,): void => {
        this.dispatch(this.actionCreator.requestLoginOnGoogleAction(item));};

    public logout = (item: IRequestLogoutActionItem,): void => {
        this.dispatch(this.actionCreator.requestLogoutAction(item));};

}

export const createAuthDispatcher = (dispatch: (action: Action) => void, actionCreator: IAuthActionCreator): IAuthDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
