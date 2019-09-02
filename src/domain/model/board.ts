import {createId} from "../../util/id";
import {config} from "../../util/config";

const size: number = config().board.size;

export enum State {
    State_Unknown = 0,
    State_Empty = 1,
    State_White = 2,
    State_Black = 3,
}

export type TBoardState = {[point: string]: State}

export class Board {

    private static initBoard = (N: number = size): TBoardState => {
        let res: TBoardState = {};
        const x2 = N >> 1;
        const y2 = N >> 1;

        // 初期盤状態作成
        for (let x = 0; x < N; x++ ) {
            for (let y = 0; y < N; y++) {
                res[[x, y].toString()] = State.State_Empty;
            }
        }
        // 初期配置石設定
        res[[x2-1, y2-1].toString()] = State.State_White;
        res[[x2-1, y2-0].toString()] = State.State_Black;
        res[[x2-0, y2-1].toString()] = State.State_Black;
        res[[x2-0, y2-0].toString()] = State.State_White;
        return res;
    };

    public static New(): Board {
        return new Board(
            createId(),
            Board.initBoard(),
            new Date(),
            new Date(),
        );
    }

    public static From(boardState: TBoardState): Board {
        const newBoardState: TBoardState = JSON.parse(JSON.stringify(boardState));
        return new Board(
            createId(),
            newBoardState,
            new Date(),
            new Date(),
        );
    }

    constructor(public readonly id: string,
                public readonly boardState: TBoardState,
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
                ) {}

}
