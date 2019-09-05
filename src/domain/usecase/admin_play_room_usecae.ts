import {PlayRoom} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {GameStatus} from "../model/game";
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
        firebase.firestore().collection(playRoomsRef).onSnapshot((querySnapshot) => {
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
            firebase.firestore().collection(playRoomsRef).get().then((docs: firebase.firestore.QuerySnapshot) => {
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
                gameId: null,
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
                const gameId: string = ref.id;
                return firebase.firestore().collection(playRoomsRef).doc(id).update({
                    gameId: gameId,
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
            gameId: doc.get("gameId"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createAdminPlayRoomUseCase = (): IAdminPlayRoomUseCase => {
    return new AdminPlayRoomUseCase();
};
