export enum AppNotificationType {
    INFO = "Information",
    WARN = "Warning",
    ERROR = "Error",
}

export type TParamsAppNotificationMessageFrom  = {
    id: string,
    type: AppNotificationType,
    message: string,
    createdAt: Date,
}

export class AppNotificationMessage {

    public static from(from: TParamsAppNotificationMessageFrom): AppNotificationMessage {

        return new AppNotificationMessage(
            from.id,
            from.type,
            from.message,
            false,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly type: AppNotificationType,
                public readonly message: string,
                public isHidden: boolean,
                public readonly createdAt: Date) {
    }
}

