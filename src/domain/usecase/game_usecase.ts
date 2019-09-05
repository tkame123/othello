import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {Game} from "../model/game";
import {Score} from "../model/score";
import {handleErrorFirebaseFirestore} from "./error_handler_firebase";
import {Board, State} from "../model/board";

const version: string = config().ver;
const gameRef: string = `version/${version}/game`;
const scoreRef: string = `version/${version}/score`;

export interface IGameUseCase {

    onGames(callback: (games: Game[]) => void): void;

    getGame(id: string): Promise<Game | null>;

    getGames(): Promise<Game[]>;

    addScore(score: Score) :Promise<void>;

    finishGame(game: Game, board: Board) : Score;

}

class GameUseCase implements IGameUseCase {

    public onGames(callback: (games: Game[]) => void): void {
        firebase.firestore().collection(gameRef).onSnapshot((docs: firebase.firestore.QuerySnapshot) => {
            let games: Game[] = [];
            docs.forEach((doc) => {
                const game: Game = this.getGameFromFS(doc);
                games.push(game);
            });

            callback(games)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        })
    };

    public getGame = (id: string): Promise<Game | null> => {
        return new Promise<Game | null>((resolve, reject) => {
            firebase.firestore().collection(gameRef).doc(id).get().then((doc: firebase.firestore.DocumentSnapshot) => {
                if (!doc.exists) { resolve(null)}
                const game: Game = this.getGameFromFS(doc);
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
                    const game: Game = this.getGameFromFS(doc);
                    games.push(game);
                });
                resolve(games);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public addScore = (score: Score): Promise<void> => {
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(scoreRef).doc(score.gameId);
        return new Promise<void>((resolve, reject) => {
            ref.set({
                blackPlayer: { id: score.blackPlayer.userId, value: score.blackPlayer.value },
                whitePlayer: { id: score.whitePlayer.userId, value: score.whitePlayer.value },
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

    public finishGame = (game: Game, board: Board): Score => {
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
            blackPlayer: {userId: game.playerBlack.id, value: blackScore},
            whitePlayer: {userId: game.playerWhite.id, value: whiteScore},
            boardSize: game.boardSize,
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        return score
    };

    private getGameFromFS = (doc: firebase.firestore.DocumentData): Game =>{
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

}

export const createGameUseCase = (): IGameUseCase => {
    return new GameUseCase();
};
