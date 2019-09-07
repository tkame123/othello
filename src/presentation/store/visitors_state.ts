import {Visitor} from "../../domain/model/visitor";

export type VisitorsState = {
    visitors: Visitor[],
    isLoading: boolean,
};
