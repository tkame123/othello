export enum ErrorType {
    // 一般的なクライアントリクエスト起因エラー
    API_REQUEST_400 = "BadRequest 400",
    // 一般的な認証エラー
    API_REQUEST_401 = "Unauthorized 401",
    // 一般的な権限エラー
    API_REQUEST_403 = "Forbidden 403",
    // 一般的な存在しないリソース参照エラー
    API_REQUEST_404 = "NotFound 404",
    // 一般的なコンフリクトエラー
    API_REQUEST_409 = "AlreadyExists 409",
    // 一般的な内部エラー
    API_REQUEST_500 = "Internal ErrorType 500",
    // サービス利用不可
    API_REQUEST_503 = "Service Unavailable 503",

    // Firebase
    FIREBASE_AUTH_ERROR = "Auth Error",
    FIREBASE_FIRESTORE_ERROR = "Database Error",

    // 未定義のエラー
    UNKNOWN = 'UNKNOWN ERROR',

}

export class AppError extends Error {
    public code: string;
    public type: ErrorType;
    public name: string;
    public message: string;

    constructor(code: string, type: ErrorType, message: string) {
        super();
        this.code = code;
        this.type = type;
        this.name = type;
        this.message = message;
    }

    public toString() {
        return `${this.name}:${this.message}`;
    }
}
