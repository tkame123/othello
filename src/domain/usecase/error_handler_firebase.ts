import {AppError, ErrorType} from "../model/app_error";

export function handleErrorFirebaseAuth(error: any): any {

    return new AppError(error.code, ErrorType.FIREBASE_AUTH_ERROR, error.message);
}

export function handleErrorFirebaseFirestore(error: any): any {

    return new AppError(error.code, ErrorType.FIREBASE_FIRESTORE_ERROR, error.message);
}
