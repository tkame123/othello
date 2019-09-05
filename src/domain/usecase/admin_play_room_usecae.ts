import {PlayRoom} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {Game, GameStatus} from "../model/game";
import {handleErrorFirebaseFirestore} from "./error_handler_firebase";

const version: string = config().ver;
const playRoomsRef: string = `version/${version}/playroom`;
const gameRef: string = `version/${version}/game`;

export interface IAdminPlayRoomUseCase {

    onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void;

    getPlayRoom(id: string): Promise<PlayRoom | null>;

    getPlayRooms(): Promise<PlayRoom[]>;

    createPlayRoom(owner: User) : Promise<void>;

    createGameOnPlayRoom(id: string, playerBlack: User, playerWhite: User): Promise<PlayRoom>;

}

class AdminPlayRoomUseCase implements IAdminPlayRoomUseCase {

    public onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void {
        firebase.firestore().collection(playRoomsRef).where("game", "==", null).onSnapshot((querySnapshot) => {
            let playRooms: PlayRoom[] = [];
            querySnapshot.forEach((doc) => {
                const playRoom: PlayRoom = this.getPlayRoomFromFS(doc);
                playRooms.push(playRoom);
            });

            callback(playRooms)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        })
    };

    public getPlayRoom = (id: string): Promise<PlayRoom | null> => {
        return new Promise<PlayRoom | null>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).doc(id).get().then((doc) => {
                if (!doc.exists) { resolve(null)}
                const playRoom: PlayRoom = this.getPlayRoomFromFS(doc);
                resolve(playRoom);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public getPlayRooms = (): Promise<PlayRoom[]> => {
        return new Promise<PlayRoom[]>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).where("game", "==", null).get().then((docs: firebase.firestore.QuerySnapshot) => {
                let playRooms: PlayRoom[] = [];
                docs.forEach((doc) => {
                    const playRoom: PlayRoom = this.getPlayRoomFromFS(doc);
                    playRooms.push(playRoom);
                });
                resolve(playRooms);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public createPlayRoom = (owner: User): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).add({
                owner: {
                    id: owner.id,
                    email: owner.email,
                },
                game: null,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public createGameOnPlayRoom(id: string, playerBlack: User, playerWhite: User): Promise<PlayRoom> {
        return new Promise<PlayRoom>((resolve, reject) => {
            firebase.firestore().collection(gameRef).add({
                playerBlack: {
                    id: playerBlack.id,
                    email: playerBlack.email,
                },
                playerWhite: {
                    id: playerWhite.id,
                    email: playerWhite.email,
                },
                gameStatus: GameStatus.GameStatus_Playing,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then((ref: firebase.firestore.DocumentReference) => {
                return firebase.firestore().collection(gameRef).doc(ref.id).get();
            }).then((doc: firebase.firestore.DocumentData) => {
                return firebase.firestore().collection(playRoomsRef).doc(id).update({
                    game: {
                        id: doc.id,
                        playerBlack: { id: doc.get("playerBlack.id"), email: doc.get("playerBlack.email")},
                        playerWhite: { id: doc.get("playerWhite.id"), email: doc.get("playerWhite.email")},
                        gameStatus: doc.get("gameStatus"),
                        updatedAt: doc.get("updatedAt"),
                        createdAt: doc.get("createdAt"),
                    },
                    updatedAt: new Date(),
                })
            }).then(() => {
                return firebase.firestore().collection(playRoomsRef).doc(id).get()
            }).then((doc: firebase.firestore.DocumentSnapshot) =>{
                const playRoom: PlayRoom = this.getPlayRoomFromFS(doc);
                resolve(playRoom);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    private getPlayRoomFromFS = (doc: firebase.firestore.DocumentData): PlayRoom =>{
        return PlayRoom.From({
            id: doc.id,
            owner: User.From(doc.get("owner.id"), doc.get("owner.email")),
            game: doc.get("game")
                    ? Game.From({
                        id: doc.get("game.id"),
                        playerBlack: User.From(doc.get("game.playerBlack.id"), doc.get("game.playerBlack.email")),
                        playerWhite: User.From(doc.get("game.playerWhite.id"), doc.get("game.playerWhite.email")),
                        gameStatus: doc.get("game.gameStatus"),
                        updatedAt: doc.get("game.updatedAt").toDate(),
                        createdAt: doc.get("game.createdAt").toDate(),
                        })
                    : null,
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createAdminPlayRoomUseCase = (): IAdminPlayRoomUseCase => {
    return new AdminPlayRoomUseCase();
};
