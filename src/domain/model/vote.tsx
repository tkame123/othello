export enum VoteEventType {
    VoteEvent_UNKNOWN = 0,
    VoteEvent_GAME_READY = 1,
}

export type TParamsVoteFrom  = {
    id: string,
    eventType: VoteEventType,
    userId: string,
    message: string,
    updatedAt: Date,
    createdAt: Date,
}

export class Vote {

    public static From(from: TParamsVoteFrom): Vote {

        return new Vote(
            from.id,
            from.eventType,
            from.userId,
            from.message,
            from.updatedAt,
            from.createdAt,
        );
    }

    constructor(public readonly id: string,
                public readonly eventType: VoteEventType,
                public readonly userId: string,
                public readonly message: string,
                public readonly updatedAt: Date,
                public readonly createdAt: Date) {
    }
}

