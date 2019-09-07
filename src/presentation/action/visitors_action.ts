import {Action} from "redux";

import{
    IListenerOnVisitorsActionItem,
    IRequestInitVisitorsActionItem,
    IRequestFinalVisitorsActionItem,
    IRequestUpdateVisitorActionItem,
    IRequestDeleteVisitorActionItem,
    ICallbackInitVisitorsActionItem,
    ICallbackFinalVisitorsActionItem,
    ICallbackUpdateVisitorActionItem,
    ICallbackDeleteVisitorActionItem,
} from "./visitors_action_item";

export enum VisitorsActionType {
    LISTENER_ON_VISITORS = "VISITORS_LISTENER_ON_VISITORS",

    REQUEST_INIT_VISITORS = "VISITORS_REQUEST_INIT_VISITORS",
    CALLBACK_INIT_VISITORS = "VISITORS_CALLBACK_INIT_VISITORS",

    REQUEST_FINAL_VISITORS = "VISITORS_REQUEST_FINAL_VISITORS",
    CALLBACK_FINAL_VISITORS = "VISITORS_CALLBACK_FINAL_VISITORS",

    REQUEST_UPDATE_VISITOR = "VISITORS_REQUEST_UPDATE_VISITOR",
    CALLBACK_UPDATE_VISITOR = "VISITORS_CALLBACK_UPDATE_VISITOR",

    REQUEST_DELETE_VISITOR = "VISITORS_REQUEST_DELETE_VISITOR",
    CALLBACK_DELETE_VISITOR = "VISITORS_CALLBACK_DELETE_VISITOR",

}

export interface IListenerOnVisitorsAction extends Action {
    type: VisitorsActionType.LISTENER_ON_VISITORS;
    isSuccess: boolean;
    item?: IListenerOnVisitorsActionItem;
}

export interface IRequestInitVisitorsAction extends Action {
    type: VisitorsActionType.REQUEST_INIT_VISITORS;
    item: IRequestInitVisitorsActionItem;
}
export interface ICallbackInitVisitorsAction extends Action {
    type: VisitorsActionType.CALLBACK_INIT_VISITORS;
    isSuccess: boolean;
    item?: ICallbackInitVisitorsActionItem;
}

export interface IRequestFinalVisitorsAction extends Action {
    type: VisitorsActionType.REQUEST_FINAL_VISITORS;
    item: IRequestFinalVisitorsActionItem;
}
export interface ICallbackFinalVisitorsAction extends Action {
    type: VisitorsActionType.CALLBACK_FINAL_VISITORS;
    isSuccess: boolean;
    item?: ICallbackFinalVisitorsActionItem;
}

export interface IRequestUpdateVisitorAction extends Action {
    type: VisitorsActionType.REQUEST_UPDATE_VISITOR;
    item: IRequestUpdateVisitorActionItem;
}
export interface ICallbackUpdateVisitorAction extends Action {
    type: VisitorsActionType.CALLBACK_UPDATE_VISITOR;
    isSuccess: boolean;
    item?: ICallbackUpdateVisitorActionItem;
}

export interface IRequestDeleteVisitorAction extends Action {
    type: VisitorsActionType.REQUEST_DELETE_VISITOR;
    item: IRequestDeleteVisitorActionItem;
}
export interface ICallbackDeleteVisitorAction extends Action {
    type: VisitorsActionType.CALLBACK_DELETE_VISITOR;
    isSuccess: boolean;
    item?: ICallbackDeleteVisitorActionItem;
}

export type VisitorsAction =
    IListenerOnVisitorsAction |
    IRequestInitVisitorsAction |
    ICallbackInitVisitorsAction |
    IRequestFinalVisitorsAction |
    ICallbackFinalVisitorsAction |
    IRequestUpdateVisitorAction |
    ICallbackUpdateVisitorAction |
    IRequestDeleteVisitorAction |
    ICallbackDeleteVisitorAction;

export interface IVisitorsActionCreator {

    listenerOnVisitorsAction(
        isSuccess: boolean,
        item?: IListenerOnVisitorsActionItem,
    ): IListenerOnVisitorsAction;

    requestInitVisitorsAction(
        item: IRequestInitVisitorsActionItem,
    ): IRequestInitVisitorsAction;
    callbackInitVisitorsAction(
        isSuccess: boolean,
        item?: ICallbackInitVisitorsActionItem,
    ): ICallbackInitVisitorsAction;

    requestFinalVisitorsAction(
        item: IRequestFinalVisitorsActionItem,
    ): IRequestFinalVisitorsAction;
    callbackFinalVisitorsAction(
        isSuccess: boolean,
        item?: ICallbackFinalVisitorsActionItem,
    ): ICallbackFinalVisitorsAction;

    requestUpdateVisitorAction(
        item: IRequestUpdateVisitorActionItem,
    ): IRequestUpdateVisitorAction;
    callbackUpdateVisitorAction(
        isSuccess: boolean,
        item?: ICallbackUpdateVisitorActionItem,
    ): ICallbackUpdateVisitorAction;

    requestDeleteVisitorAction(
        item: IRequestDeleteVisitorActionItem,
    ): IRequestDeleteVisitorAction;
    callbackDeleteVisitorAction(
        isSuccess: boolean,
        item?: ICallbackDeleteVisitorActionItem,
    ): ICallbackDeleteVisitorAction;

}

class ActionCreator implements IVisitorsActionCreator {

    public listenerOnVisitorsAction = (
        isSuccess: boolean,
        item?: IListenerOnVisitorsActionItem,
    ): IListenerOnVisitorsAction => {
        return {
            type: VisitorsActionType.LISTENER_ON_VISITORS,
            isSuccess,
            item,
        };
    };

    public requestInitVisitorsAction = (
        item: IRequestInitVisitorsActionItem,
    ): IRequestInitVisitorsAction => {
        return {
            type: VisitorsActionType.REQUEST_INIT_VISITORS,
            item,
        };
    };
    public callbackInitVisitorsAction = (
        isSuccess: boolean,
        item?: ICallbackInitVisitorsActionItem,
    ): ICallbackInitVisitorsAction => {
        return {
            type: VisitorsActionType.CALLBACK_INIT_VISITORS,
            isSuccess,
            item,
        };
    };

    public requestFinalVisitorsAction = (
        item: IRequestFinalVisitorsActionItem,
    ): IRequestFinalVisitorsAction => {
        return {
            type: VisitorsActionType.REQUEST_FINAL_VISITORS,
            item,
        };
    };
    public callbackFinalVisitorsAction = (
        isSuccess: boolean,
        item?: ICallbackFinalVisitorsActionItem,
    ): ICallbackFinalVisitorsAction => {
        return {
            type: VisitorsActionType.CALLBACK_FINAL_VISITORS,
            isSuccess,
            item,
        };
    };

    public requestUpdateVisitorAction = (
        item: IRequestUpdateVisitorActionItem,
    ): IRequestUpdateVisitorAction => {
        return {
            type: VisitorsActionType.REQUEST_UPDATE_VISITOR,
            item,
        };
    };
    public callbackUpdateVisitorAction = (
        isSuccess: boolean,
        item?: ICallbackUpdateVisitorActionItem,
    ): ICallbackUpdateVisitorAction => {
        return {
            type: VisitorsActionType.CALLBACK_UPDATE_VISITOR,
            isSuccess,
            item,
        };
    };

    public requestDeleteVisitorAction = (
        item: IRequestDeleteVisitorActionItem,
    ): IRequestDeleteVisitorAction => {
        return {
            type: VisitorsActionType.REQUEST_DELETE_VISITOR,
            item,
        };
    };
    public callbackDeleteVisitorAction = (
        isSuccess: boolean,
        item?: ICallbackDeleteVisitorActionItem,
    ): ICallbackDeleteVisitorAction => {
        return {
            type: VisitorsActionType.CALLBACK_DELETE_VISITOR,
            isSuccess,
            item,
        };
    };

}

export const createVisitorsActionCreator = (): IVisitorsActionCreator => {
    return new ActionCreator();
};
