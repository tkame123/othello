import {Visitor} from "../../domain/model/visitor";

export interface IListenerOnVisitorsActionItem {
    visitors: Visitor[],
}

export interface IRequestInitVisitorsActionItem {
}
export interface ICallbackInitVisitorsActionItem {
}

export interface IRequestFinalVisitorsActionItem {
}
export interface ICallbackFinalVisitorsActionItem {
}

export interface IRequestUpdateVisitorActionItem {
    userId: string,
    playRoomId: string | null;
}
export interface ICallbackUpdateVisitorActionItem {
}

export interface IRequestDeleteVisitorActionItem {
    userId: string;
}
export interface ICallbackDeleteVisitorActionItem {
}
