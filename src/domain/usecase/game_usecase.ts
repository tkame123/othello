import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {Game, GameStatus} from "../model/game";
import {Score} from "../model/score";
import {handleErrorFirebaseFirestore} from "./error_handler_firebase";
import {Board, State} from "../model/board";

const version: string = config().ver;
const gameRef: string = `version/${version}/game`;
const scoreRef: string = `version/${version}/score`;

export interface IGameUseCase {

    onGames(callback: (games: Game[]) => void): void;

    offGames(): void;

    getGame(id: string): Promise<Game | null>;

    getGames(): Promise<Game[]>;

    getScore(gameId: string): Promise<Score | null>;

    setScore(game: Game, board: Board) :Promise<void>;

    updateGameStatusEnd(id: string) :Promise<void>;

}

class GameUseCase implements IGameUseCase {

    private unsubscribeGames: any;

    public onGames(callback: (games: Game[]) => void): void {
        this.unsubscribeGames = firebase.firestore().collection(gameRef).onSnapshot((docs: firebase.firestore.QuerySnapshot) => {
            let games: Game[] = [];
            docs.forEach((doc) => {
                const game: Game = this.helperGetGame(doc);
                games.push(game);
            });

            callback(games)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        })
    };

    public offGames(): void {
        this.unsubscribeGames();
    }

    public getGame = (id: string): Promise<Game | null> => {
        return new Promise<Game | null>((resolve, reject) => {
            firebase.firestore().collection(gameRef).doc(id).get().then((doc: firebase.firestore.DocumentSnapshot) => {
                if (!doc.exists) { resolve(null)}
                const game: Game = this.helperGetGame(doc);
                resolve(game);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public getGames = (): Promise<Game[]> => {
        return new Promise<Game[]>((resolve, reject) => {
            firebase.firestore().collection(gameRef).get().then((docs: firebase.firestore.QuerySnapshot) => {
                let games: Game[] = [];
                docs.forEach((doc) => {
                    const game: Game = this.helperGetGame(doc);
                    games.push(game);
                });
                resolve(games);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public getScore = (gameId: string): Promise<Score | null> => {
        return new Promise<Score | null>((resolve, reject) => {
            firebase.firestore().collection(scoreRef).doc(gameId).get().then((doc: firebase.firestore.DocumentSnapshot) => {
                if (!doc.exists) { resolve(null)}
                const score: Score = this.helperGetScore(doc);
                resolve(score);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public setScore = (game: Game, board: Board): Promise<void> => {
        const score: Score = this.calcScore(game, board);
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(scoreRef).doc(score.gameId);
        return new Promise<void>((resolve, reject) => {
            ref.set({
                playerBlack: { id: score.playerBlack.id, value: score.playerBlack.value },
                playerWhite: { id: score.playerWhite.id, value: score.playerWhite.value },
                boardSize: score.boardSize,
                updatedAt: score.updatedAt,
                createdAt: score.createdAt,
            }).then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });

    };

    public updateGameStatusEnd = (id: string): Promise<void> => {
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameRef).doc(id);
        return new Promise<void>((resolve, reject) => {
            ref.update({
                gameStatus: GameStatus.GameStatus_End,
                updatedAt: new Date(),
            }).then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });

    };

    private calcScore = (game: Game, board: Board): Score => {
        let blackScore: number = 0;
        let whiteScore: number = 0;

        [...Array(game.boardSize)].forEach((item, y) => {
            [...Array(game.boardSize)].forEach((item, x) => {
                const disk: State = board.boardState[[x, y].toString()];
                if (disk === State.State_White) {
                    whiteScore++
                }
                if (disk === State.State_Black) {
                    blackScore++
                }
            })
        });
        const score: Score = Score.From({
            gameId: game.id,
            playerBlack: {id: game.playerBlack.id, value: blackScore},
            playerWhite: {id: game.playerWhite.id, value: whiteScore},
            boardSize: game.boardSize,
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        return score
    };

    private helperGetGame = (doc: firebase.firestore.DocumentData): Game =>{
        return Game.From({
            id: doc.id,
            playerBlack: User.From(doc.get("playerBlack.id"), doc.get("playerBlack.email")),
            playerWhite: User.From(doc.get("playerWhite.id"), doc.get("playerWhite.email")),
            gameStatus: doc.get("gameStatus"),
            boardSize: doc.get("boardSize"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

    private helperGetScore = (doc: firebase.firestore.DocumentData): Score =>{
        return Score.From({
            gameId: doc.id,
            playerBlack: {id: doc.get("playerBlack.id"), value: doc.get("playerBlack.value")},
            playerWhite: {id: doc.get("playerWhite.id"), value: doc.get("playerWhite.value")},
            boardSize: doc.get("boardSize"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createGameUseCase = (): IGameUseCase => {
    return new GameUseCase();
};
