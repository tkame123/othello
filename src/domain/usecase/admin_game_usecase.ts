import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {Game, GameStatus, TParamsGameFrom} from "../model/game";

const version: string = config().ver;
const gameRef: string = `version/${version}/game`;

export interface IAdminGameUseCase {

    onGames(callback: (games: Game[]) => void): void;

    getGame(id: string): Promise<Game | null>;

    getGames(): Promise<Game[]>;

    createGame(playerWhite: User, playerBlack: User) : Promise<Game>;

}

class AdminGameUseCase implements IAdminGameUseCase {

    public onGames(callback: (games: Game[]) => void): void {
        firebase.firestore().collection(gameRef).onSnapshot((querySnapshot) => {
            let games: Game[] = [];
            querySnapshot.forEach((doc) => {
                const params: TParamsGameFrom ={
                    id: doc.id,
                    playerBlack: User.From(doc.get("playerBlack.userId"), doc.get("playerBlack.email")),
                    playerWhite: User.From(doc.get("playerWhite.userId"), doc.get("playerWhite.email")),
                    gameStatus: doc.get("gameStatus"),
                    updatedAt: doc.get("updatedAt").toDate(),
                    createdAt: doc.get("createdAt").toDate(),
                };
                const game: Game = Game.From(params);
                games.push(game);
            });

            callback(games)
        }, (error: any) => {
            throw new Error(error);
        })
    };

    public getGame = (id: string): Promise<Game | null> => {

        return new Promise<Game | null>((resolve, reject) => {
            firebase.firestore().collection(gameRef).doc(id).get().then((doc) => {
                if (!doc.exists) { resolve(null)}

                const params: TParamsGameFrom ={
                    id: doc.id,
                    playerBlack: User.From(doc.get("playerBlack.userId"), doc.get("playerBlack.email")),
                    playerWhite: User.From(doc.get("playerWhite.userId"), doc.get("playerWhite.email")),
                    gameStatus: doc.get("gameStatus"),
                    updatedAt: doc.get("updatedAt").toDate(),
                    createdAt: doc.get("createdAt").toDate(),
                };
                const game: Game = Game.From(params);
                resolve(game);
            }).catch((e: any) => {
                reject(e);
            });
        });
    };

    public getGames = (): Promise<Game[]> => {

        return new Promise<Game[]>((resolve, reject) => {
            firebase.firestore().collection(gameRef).get().then((querySnapshot) => {
                let games: Game[] = [];
                querySnapshot.forEach((doc) => {
                    const params: TParamsGameFrom ={
                        id: doc.id,
                        playerBlack: User.From(doc.get("playerBlack.userId"), doc.get("playerBlack.email")),
                        playerWhite: User.From(doc.get("playerWhite.userId"), doc.get("playerWhite.email")),
                        gameStatus: doc.get("gameStatus"),
                        updatedAt: doc.get("updatedAt").toDate(),
                        createdAt: doc.get("createdAt").toDate(),
                    };
                    const game: Game = Game.From(params);
                    games.push(game);
                });
                resolve(games);
            }).catch((e: any) => {
                reject(e);
            });
        });
    };

    public createGame = (playerWhite: User, playerBlack: User): Promise<Game> => {
        return new Promise<Game>((resolve, reject) => {
            firebase.firestore().collection(gameRef).add({
                playerBlack: {
                    userId: playerBlack.id,
                    email: playerBlack.email,
                },
                playerWhite: {
                    userId: playerWhite.id,
                    email: playerWhite.email,
                },
                gameStatus: GameStatus.GameStatus_Playing,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then((ref: firebase.firestore.DocumentReference) => {
                return ref.get();
            }).then((doc: firebase.firestore.DocumentSnapshot) => {
                const params: TParamsGameFrom = {
                    id: doc.id,
                    playerBlack: User.From(doc.get("playerBlack.userId"), doc.get("playerBlack.email")),
                    playerWhite: User.From(doc.get("playerWhite.userId"), doc.get("playerWhite.email")),
                    gameStatus: doc.get("gameStatus"),
                    updatedAt: doc.get("updatedAt").toDate(),
                    createdAt: doc.get("createdAt").toDate(),
                };
                const game:Game = Game.From(params);
                resolve(game);
            }).catch((error: any) => {
                console.log(error);
                reject(error);
            })
        });
    };

}

export const createAdminGameUseCase = (): IAdminGameUseCase => {
    return new AdminGameUseCase();
};
