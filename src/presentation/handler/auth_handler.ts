import {put, take, call} from "redux-saga/effects";
import {eventChannel} from 'redux-saga'

import {
    createAuthActionCreator,
    AuthActionType,
    IAuthActionCreator,
} from "../action/auth_action";
import {
    ICallbackOnAuthUserActionItem,
    ICallbackGetAuthUserActionItem,
    ICallbackLoginOnGoogleActionItem,
    ICallbackLogoutActionItem,
} from "../action/auth_action_item";
import {User} from "../../domain/model/user";
import {createAuthUseCase, IAuthUseCase} from "../../domain/usecase/auth_usecase";

const authUsecase: IAuthUseCase = createAuthUseCase();
const actionCreator: IAuthActionCreator = createAuthActionCreator();

const authChannel = () => {
    const channel = eventChannel(emit => {
        authUsecase.onAuth((user: User | null) =>{
            emit({user})
        });

        const unsubscribe = () => {};

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
            const res: ICallbackOnAuthUserActionItem = {user, authState};
            yield put(actionCreator.callbackOnAuthUserAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackGetAuthUserAction(false));
        }
    }
}

function* handleGetAuthUserInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_GET_AUTH_USER_AUTH);
            const user: User | null = yield call(getAuthUser);
            const authState: boolean = !!user;
            const res: ICallbackGetAuthUserActionItem = {user, authState};
            yield put(actionCreator.callbackGetAuthUserAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackGetAuthUserAction(false));
        }
    }
}

function* handleLoginOnGoogleInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_LOGIN_GOOGLE_AUTH);
            yield call(loginOnGoogle);
            const res: ICallbackLoginOnGoogleActionItem = {};
            yield put(actionCreator.callbackLoginOnGoogleAction(true, res));
        } catch (error) {
            yield put(actionCreator.callbackLoginOnGoogleAction(false));
        }
    }
}

function* handleLogoutInAuth() {
    while (true) {
        try {
            yield take(AuthActionType.REQUEST_LOGOUT_AUTH);
            yield call(logout);
            const res: ICallbackLogoutActionItem = {};
            yield put(actionCreator.callbackLogoutAction(true, res));
        } catch (error) {
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

export {onAuth, handleGetAuthUserInAuth, handleLoginOnGoogleInAuth, handleLogoutInAuth}
