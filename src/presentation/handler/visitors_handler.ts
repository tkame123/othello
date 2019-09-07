import {put, take, call, fork, cancelled, cancel, select} from "redux-saga/effects";
import {eventChannel, Task} from 'redux-saga'

import {
    createVisitorsActionCreator,
    VisitorsActionType,
    IVisitorsActionCreator,
    IRequestUpdateVisitorAction,
    IRequestDeleteVisitorAction,
} from "../action/visitors_action";

import {Visitor} from "../../domain/model/visitor";
import {createVisitorUseCase, IVisitorUseCase} from "../../domain/usecase/visirot_usercase";
import {handleErrorForHandler} from "./handleErrorForHandler";
import {AppState} from "../store/app_state";
import {AuthState} from "../store/auth_state";

const visitorUseCase: IVisitorUseCase = createVisitorUseCase();
const actionCreator: IVisitorsActionCreator = createVisitorsActionCreator();

let visitorsChannelTask: Task;

const visitorssChannel = () => {
    const channel = eventChannel(emit => {
        visitorUseCase.onVisitors((visitors: Visitor[]) =>{
            emit({visitors})
        });

        const unsubscribe = () => {
            visitorUseCase.offVisitors();
        };

        return unsubscribe
    });
    return channel
};

function* onVisitors() {
    const channel = yield call(visitorssChannel);
    while (true) {
        try {
            const { visitors } = yield take(channel);
            yield put(actionCreator.listenerOnVisitorsAction(true, {visitors}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.listenerOnVisitorsAction(false));
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

function* handleInitVisitorsInVisitors() {
    while (true) {
        try {
            yield take(VisitorsActionType.REQUEST_INIT_VISITORS);
            visitorsChannelTask = yield fork(onVisitors);
            yield put(actionCreator.callbackInitVisitorsAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackInitVisitorsAction(false));
        }
    }
}

function* handleFinalVisitorsInVisitors() {
    while (true) {
        try {
            yield take(VisitorsActionType.REQUEST_FINAL_VISITORS);
            const selector = (state: AppState) => state.authReducer;
            const _state: AuthState = yield select(selector);
            if (_state.user) {
                yield call(deleteVisitor, _state.user.id);
            }
            yield cancel(visitorsChannelTask);
            yield put(actionCreator.callbackFinalVisitorsAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackFinalVisitorsAction(false));
        }
    }
}

function* handleUpdateVisitorInVisitors() {
    while (true) {
        try {
            const action: IRequestUpdateVisitorAction = yield take(VisitorsActionType.REQUEST_UPDATE_VISITOR);
            const _visitor: Visitor | null = yield call(getVisitor, action.item.userId);
            if (!_visitor) {
                yield call(createVisitor, action.item.userId, action.item.playRoomId);
            } else {
                yield call(updateVisitor, action.item.userId, action.item.playRoomId);
            }
            yield put(actionCreator.callbackUpdateVisitorAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackUpdateVisitorAction(false));
        }
    }
}

function* handleDeleteVisitorInVisitors() {
    while (true) {
        try {
            const action: IRequestDeleteVisitorAction = yield take(VisitorsActionType.REQUEST_DELETE_VISITOR);
            yield call(deleteVisitor, action.item.userId);
            yield put(actionCreator.callbackDeleteVisitorAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackDeleteVisitorAction(false));
        }
    }
}

const getVisitor = (userId: string): Promise<Visitor | null> => {
    return visitorUseCase.getVisitor(userId);
};

const createVisitor = (userId: string, playRoomId: string | null): Promise<void> => {
    return visitorUseCase.createVisitor(userId, playRoomId);
};

const updateVisitor = (userId: string, playRoomId: string | null): Promise<void> => {
    return visitorUseCase.updateVisitor(userId, playRoomId);
};

const deleteVisitor = (userId: string): Promise<void> => {
    return visitorUseCase.deleteVisitor(userId);
};

export {handleInitVisitorsInVisitors, handleFinalVisitorsInVisitors, handleUpdateVisitorInVisitors, handleDeleteVisitorInVisitors}
