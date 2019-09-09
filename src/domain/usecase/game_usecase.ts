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
const playRoomRef: string = `version/${version}/playroom`;
const scoreRef: string = `version/${version}/score`;

export interface IGameUseCase {

    onGames(callback: (games: Game[]) => void): void;

    offGames(): void;

    onGame(gameId: string, callback: (game: Game | null) => void): void;

    offGame(): void;

    getGame(gameId: string): Promise<Game | null>;

    getGames(): Promise<Game[]>;

    getScore(gameId: string): Promise<Score | null>;

    setScore(game: Game, board: Board): Promise<void>;

    createGameWithUpdatePlayRoom(playRoomId: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<void>;

    updateGameWithPlayRoom(gameId: string, gameStatus: GameStatus): Promise<void>;

}

class GameUseCase implements IGameUseCase {

    private unsubscribeGames: any;
    private unsubscribeGame: any;

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

    public onGame(gameId: string, callback: (game: Game | null) => void): void {
        this.unsubscribeGame = firebase.firestore().collection(gameRef).doc(gameId).onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
            if (!doc.exists) {callback(null)}
            const game: Game = this.helperGetGame(doc);
            callback(game)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        })
    };

    public offGame(): void {
        this.unsubscribeGame();
    }

    public getGame = (gameId: string): Promise<Game | null> => {
        return new Promise<Game | null>((resolve, reject) => {
            firebase.firestore().collection(gameRef).doc(gameId).get().then((doc: firebase.firestore.DocumentSnapshot) => {
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

    public createGameWithUpdatePlayRoom = (playRoomId: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const batch: firebase.firestore.WriteBatch = firebase.firestore().batch();
            const newGameId: string = firebase.firestore().collection(gameRef).doc().id;
            const gameDocRef: firebase.firestore.DocumentReference = firebase.firestore().collection(gameRef).doc(newGameId);
            const playRoomDocRef: firebase.firestore.DocumentReference = firebase.firestore().collection(playRoomRef).doc(playRoomId);

            const gameParams = {
                playerBlack: {
                    id: playerBlack.id,
                    email: playerBlack.email,
                },
                playerWhite: {
                    id: playerWhite.id,
                    email: playerWhite.email,
                },
                boardSize: boardSize,
                gameStatus: GameStatus.GameStatus_Playing,
                updatedAt: new Date(),
                createdAt: new Date(),
            };
            const prayRoomUpdateParams = {
                gameId: newGameId,
                playerBlack: {
                    id: playerBlack.id,
                    email: playerBlack.email,
                },
                playerWhite: {
                    id: playerWhite.id,
                    email: playerWhite.email,
                },
                updatedAt: new Date(),
            };

            batch.set(gameDocRef, gameParams,{ merge: true });
            batch.set(playRoomDocRef, prayRoomUpdateParams,{ merge: true });
            batch.commit().then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
         });
    };

    public updateGameWithPlayRoom = (gameId: string, gameStatus: GameStatus): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            return firebase.firestore().collection(playRoomRef).where("gameId", "==", gameId).get().then((docs: firebase.firestore.QuerySnapshot) =>{
                const batch: firebase.firestore.WriteBatch = firebase.firestore().batch();
                const gameDocRef: firebase.firestore.DocumentReference = firebase.firestore().collection(gameRef).doc(gameId);

                const gameParams = {
                    gameStatus: gameStatus,
                    updatedAt: new Date(),
                };
                const prayRoomUpdateParams = {
                    gameId: gameStatus === GameStatus.GameStatus_End ? null : gameId,
                    updatedAt: new Date(),
                };

                docs.forEach((item) => {
                    batch.set(item.ref, prayRoomUpdateParams, { merge: true })
                });
                batch.set(gameDocRef, gameParams, { merge: true });
                return batch.commit()
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
