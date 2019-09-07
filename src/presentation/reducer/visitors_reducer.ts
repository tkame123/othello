import {Reducer} from "redux";
import {VisitorsState} from "../store/visitors_state";
import {
    VisitorsAction,
    VisitorsActionType,
    IListenerOnVisitorsAction,
} from "../action/visitors_action";

const initialState: VisitorsState = {
    visitors: [],
    isLoading: false,
};

const visitorsReducer: Reducer<VisitorsState, VisitorsAction> = (state = initialState, action: VisitorsAction): VisitorsState => {
    switch (action.type) {

        case VisitorsActionType.LISTENER_ON_VISITORS: {
            const _action = action as IListenerOnVisitorsAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    visitors: _action.item ? _action.item.visitors : [],
                    isLoading: state.isLoading,
                });
            } else {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: state.isLoading,
                });
            }
        }

        case VisitorsActionType.REQUEST_INIT_VISITORS: {
            return Object.assign({}, state, {
                visitors: state.visitors,
                isLoading: true,
            });
        }
        case VisitorsActionType.CALLBACK_INIT_VISITORS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            }
        }

        case VisitorsActionType.REQUEST_FINAL_VISITORS: {
            return Object.assign({}, state, {
                visitors: state.visitors,
                isLoading: true,
            });
        }
        case VisitorsActionType.CALLBACK_FINAL_VISITORS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            }
        }

        case VisitorsActionType.REQUEST_UPDATE_VISITOR: {
            return Object.assign({}, state, {
                visitors: state.visitors,
                isLoading: true,
            });
        }
        case VisitorsActionType.CALLBACK_UPDATE_VISITOR: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            }
        }

        case VisitorsActionType.REQUEST_DELETE_VISITOR: {
            return Object.assign({}, state, {
                visitors: state.visitors,
                isLoading: true,
            });
        }
        case VisitorsActionType.CALLBACK_DELETE_VISITOR: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    visitors: state.visitors,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default visitorsReducer;
