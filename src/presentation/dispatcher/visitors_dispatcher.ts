import {Action} from "redux";
import {IVisitorsActionCreator} from "../action/visitors_action";

import {
    IRequestInitVisitorsActionItem,
    IRequestFinalVisitorsActionItem,
    IRequestUpdateVisitorActionItem,
    IRequestDeleteVisitorActionItem,
} from "../action/visitors_action_item"

export interface IVisitorsDispatcher {

    initVisitor(item: IRequestInitVisitorsActionItem): void;

    finalVisitors(item: IRequestFinalVisitorsActionItem): void;

    updateVisitor(item: IRequestUpdateVisitorActionItem): void;

    deleteVisitor(item: IRequestDeleteVisitorActionItem): void;

}

class Dispatcher implements IVisitorsDispatcher {

    constructor(private dispatch: (action: Action) => void,
                private actionCreator: IVisitorsActionCreator) {};

    public initVisitor = (item: IRequestInitVisitorsActionItem,): void => {
        this.dispatch(this.actionCreator.requestInitVisitorsAction(item));};

    public finalVisitors = (item: IRequestFinalVisitorsActionItem,): void => {
        this.dispatch(this.actionCreator.requestFinalVisitorsAction(item));};

    public updateVisitor = (item: IRequestUpdateVisitorActionItem,): void => {
        this.dispatch(this.actionCreator.requestUpdateVisitorAction(item));};

    public deleteVisitor = (item: IRequestDeleteVisitorActionItem,): void => {
        this.dispatch(this.actionCreator.requestDeleteVisitorAction(item));};

}

export const createVisitorsDispatcher = (dispatch: (action: Action) => void, actionCreator: IVisitorsActionCreator): IVisitorsDispatcher => {
    return new Dispatcher(dispatch, actionCreator);
};
