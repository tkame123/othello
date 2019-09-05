import {createId} from "../../util/id";

export enum State {
    State_Unknown = 0,
    State_Empty = 1,
    State_Black = 2,
    State_White = 3,
}

export type TBoardState = {[point: string]: State}

export class Board {

    private static initBoard = (boardSize: number): TBoardState => {
        let res: TBoardState = {};
        const x2 = boardSize >> 1;
        const y2 = boardSize >> 1;

        // 初期盤状態作成
        for (let x = 0; x < boardSize; x++ ) {
            for (let y = 0; y < boardSize; y++) {
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

    public static New(boardSize: number): Board {
        return new Board(
            createId(),
            Board.initBoard(boardSize),
            boardSize,
            new Date(),
            new Date(),
        );
    }

    public static From(boardState: TBoardState, boardSize: number): Board {
        const newBoardState: TBoardState = JSON.parse(JSON.stringify(boardState));
        return new Board(
            createId(),
            newBoardState,
            boardSize,
            new Date(),
            new Date(),
        );
    }

    constructor(public readonly id: string,
                public readonly boardState: TBoardState,
                public readonly boardSize: number,
                public readonly updatedAt: Date,
                public readonly createdAt: Date,
                ) {}

}
