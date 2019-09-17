import {Reducer} from "redux";
import {AuthState} from "../store/auth_state";
import {
    AuthAction,
    AuthActionType,
    ICallbackGetAuthUserAction,
    IListenerOnAuthUserAction,
} from "../action/auth_action";
import {AuthStateType} from "../../domain/model/user";

const initialState: AuthState = {
    user: null,
    authState: AuthStateType.INITIALIZING,
    isLoading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {

        case AuthActionType.LISTENER_ON_AUTH_USER_AUTH: {
            const _action = action as IListenerOnAuthUserAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: _action.item ? _action.item.user : null,
                    authState: _action.item ? _action.item.authState : AuthStateType.UNKNOWN,
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

        case AuthActionType.REQUEST_INIT_AUTH_USER_AUTH: {
            return Object.assign({}, state, {
                user: state.user,
                authState: state.authState,
                isLoading: true,
            });
        }
        case AuthActionType.CALLBACK_INIT_AUTH_USER_ROOMS: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
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

        case AuthActionType.REQUEST_FINAL_AUTH_USER_AUTH: {
            return Object.assign({}, state, {
                user: state.user,
                authState: state.authState,
                isLoading: true,
            });
        }
        case AuthActionType.CALLBACK_FINAL_AUTH_USER: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: null,
                    authState: AuthStateType.UNKNOWN,
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

        case AuthActionType.REQUEST_GET_AUTH_USER_AUTH: {
            return Object.assign({}, state, {
                user: state.user,
                authState: state.authState,
                isLoading: true,
            });
        }
        case AuthActionType.CALLBACK_GET_AUTH_USER_AUTH: {
            const _action = action as ICallbackGetAuthUserAction;
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: _action.item ? _action.item.user : null,
                    authState: _action.item ? _action.item.authState : AuthStateType.UNKNOWN,
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
        case AuthActionType.CALLBACK_LOGIN_GOOGLE_AUTH: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
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
        case AuthActionType.CALLBACK_LOGOUT_AUTH: {
            if (action.isSuccess) {
                return Object.assign({}, state, {
                    user: state.user,
                    authState: state.authState,
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
