import {put, take, call, fork, cancel, cancelled} from "redux-saga/effects";
import {eventChannel, Task} from 'redux-saga'

import {
    createAuthActionCreator,
    AuthActionType,
    IAuthActionCreator,
} from "../action/auth_action";
import {User} from "../../domain/model/user";
import {createAuthUseCase, IAuthUseCase} from "../../domain/usecase/auth_usecase";
import {handleErrorForHandler} from "./handleErrorForHandler";

const authUsecase: IAuthUseCase = createAuthUseCase();
const actionCreator: IAuthActionCreator = createAuthActionCreator();

let authChannelTask: Task;

const authChannel = () => {
    const channel = eventChannel(emit => {
        authUsecase.onAuth((user: User | null) =>{
            emit({user})
        });

        const unsubscribe = () => {
            authUsecase.offAuth();
        };

        return unsubscribe
    });
    return channel
};

function* onAuth() {
    const channel = yield call(authChannel);
    while (true) {
        try {
            const { user } = yield take(channel);
            const authState: boolean = !!user;
            yield put(actionCreator.listenerOnAuthUserAction(true, {user, authState}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetAuthUserAction(false));
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    }
}

function* handleInitAuthUserInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_INIT_AUTH_USER_AUTH);
            authChannelTask = yield fork(onAuth);
            yield put(actionCreator.callbackInitAuthUserAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackInitAuthUserAction(false));
        }
    }
}

function* handleFinalAuthUserInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_FINAL_AUTH_USER_AUTH);
            yield cancel(authChannelTask);
            yield put(actionCreator.callbackFinalAuthUserAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackFinalAuthUserAction(false));
        }
    }
}

function* handleGetAuthUserInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_GET_AUTH_USER_AUTH);
            const user: User | null = yield call(getAuthUser);
            const authState: boolean = !!user;
            yield put(actionCreator.callbackGetAuthUserAction(true, {user, authState}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackGetAuthUserAction(false));
        }
    }
}

function* handleLoginOnGoogleInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_LOGIN_GOOGLE_AUTH);
            yield call(loginOnGoogle);
            yield put(actionCreator.callbackLoginOnGoogleAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackLoginOnGoogleAction(false));
        }
    }
}

function* handleLogoutInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_LOGOUT_AUTH);
            yield call(logout);
            yield put(actionCreator.callbackLogoutAction(true, {}));
        } catch (error) {
            yield fork(handleErrorForHandler, error);
            yield put(actionCreator.callbackLogoutAction(false));
        }
    }
}

const getAuthUser = (): Promise<User | null> => {
    return authUsecase.getAuthUser();
};

const loginOnGoogle = (): Promise<void> => {
    return authUsecase.loginOnGoogle();
};

const logout = (): Promise<void> => {
    return authUsecase.logout();
};

export {handleInitAuthUserInAuth, handleFinalAuthUserInAuth, handleGetAuthUserInAuth, handleLoginOnGoogleInAuth, handleLogoutInAuth}
