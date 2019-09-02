import {Reducer} from "redux";
import {AuthState} from "../store/auth_state";
import {
    AuthAction,
    AuthActionType,
    ICallbackOnAuthUserAction,
    ICallbackGetAuthUserAction,
} from "../action/auth_action";

const initialState: AuthState = {
    user: null,
    authState: false,
    isLoading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {

        case AuthActionType.CALLBACK_ON_AUTH_USER_AUTH: {
            const _action = action as ICallbackOnAuthUserAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: _action.item ? _action.item.user : null,
                    authState: _action.item ? _action.item.authState : false,
                    isLoading: state.isLoading,
                });
            } else {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
                    isLoading: state.isLoading,
                });
            }
        }

        case AuthActionType.REQUEST_GET_AUTH_USER_AUTH: {
            return Object.assign({}, state, {
                user: state.user,
                authState: state.authState,
                isLoading: true,
            });
        }
        case AuthActionType.CALLBACK_GET_AUTH_USER_ROOMS: {
            const _action = action as ICallbackGetAuthUserAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: _action.item ? _action.item.user : null,
                    authState: _action.item ? _action.item.authState : false,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
                    isLoading: false,
                });
            }
        }

        case AuthActionType.REQUEST_LOGIN_GOOGLE_AUTH: {
            return Object.assign({}, state, {
                user: state.user,
                authState: state.authState,
                isLoading: true,
            });
        }
        case AuthActionType.CALLBACK_LOGIN_GOOGLE_ROOMS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: true,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
                    isLoading: false,
                });
            }
        }

        case AuthActionType.REQUEST_LOGOUT_AUTH: {
            return Object.assign({}, state, {
                user: state.user,
                authState: state.authState,
                isLoading: true,
            });
        }
        case AuthActionType.CALLBACK_LOGOUT_ROOMS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: false,
                    isLoading: false,
                });
            } else {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
                    isLoading: false,
                });
            }
        }

        default:
            return state;
    }
};

export default authReducer;
