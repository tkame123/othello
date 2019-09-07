import {PlayRoom} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {handleErrorFirebaseFirestore} from "./error_handler_firebase";

const version: string = config().ver;
const playRoomRef: string = `version/${version}/playroom`;

export interface IPlayRoomUseCase {

    onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void;

    offPlayrooms(): void;

    onPlayRoom(id: string, callback: (playRoom: PlayRoom | null) => void): void;

    offPlayroom(): void;

    getPlayRooms(): Promise<PlayRoom[]>;

    getPlayRoom(id: string): Promise<PlayRoom | null>;

    createPlayRoom(): Promise<void>;

    updatePlayRoom(id: string, gameId: string | null , playerBlack: User | null, playerWhite: User | null): Promise<void>;

    deletePlayRoom(id: string): Promise<void>;

}

class PlayRoomUseCase implements IPlayRoomUseCase {

    private unsubscribePlayRooms: any;
    private unsubscribePlayRoom: any;

    public onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void {
        this.unsubscribePlayRooms = firebase.firestore().collection(playRoomRef).orderBy("createdAt", "desc").onSnapshot((docs: firebase.firestore.QuerySnapshot) => {
            let playRooms: PlayRoom[] = [];
            docs.forEach((doc) => {
                const playRoom: PlayRoom = this.helperGetPlayRoom(doc);
                playRooms.push(playRoom);
            });

            callback(playRooms)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        });
    };

    public offPlayrooms(): void {
        this.unsubscribePlayRooms();
    }

    public onPlayRoom(id: string, callback: (playRooms: PlayRoom | null) => void): void {
        this.unsubscribePlayRoom = firebase.firestore().collection(playRoomRef).doc(id).onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
            if (!doc.exists) {callback(null)}
            const playRoom: PlayRoom = this.helperGetPlayRoom(doc);
            callback(playRoom)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        });
    };

    public offPlayroom(): void {
        this.unsubscribePlayRoom();
    }

    public getPlayRoom = (id: string): Promise<PlayRoom | null> => {
        return new Promise<PlayRoom | null>((resolve, reject) => {
            firebase.firestore().collection(playRoomRef).doc(id).get().then((doc) => {
                if (!doc.exists) { resolve(null)}
                const playRoom: PlayRoom = this.helperGetPlayRoom(doc);
                resolve(playRoom);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public getPlayRooms = (): Promise<PlayRoom[]> => {
        return new Promise<PlayRoom[]>((resolve, reject) => {
            firebase.firestore().collection(playRoomRef).orderBy("createdAt", "desc").get().then((docs: firebase.firestore.QuerySnapshot) => {
                let playRooms: PlayRoom[] = [];
                docs.forEach((doc) => {
                    const playRoom: PlayRoom = this.helperGetPlayRoom(doc);
                    playRooms.push(playRoom);
                });
                resolve(playRooms);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            });
        });
    };

    public createPlayRoom = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(playRoomRef).add({
                gameId: null,
                playerBlack: null,
                playerWhite: null,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public updatePlayRoom = (id: string, gameId: string | null , playerBlack: User | null, playerWhite: User | null): Promise<void> => {
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(playRoomRef).doc(id);
        return new Promise<void>((resolve, reject) => {
            const paramsPlayerBlack = playerBlack
                ? { id: playerBlack.id, email: playerBlack.email }
                : null;
            const paramsPlayerWhite = playerWhite
                ? { id: playerWhite.id, email: playerWhite.email }
                : null;
            ref.update({
                playerBlack: paramsPlayerBlack,
                playerWhite: paramsPlayerWhite,
                gameId: gameId,
                updatedAt: new Date(),
            }).then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public deletePlayRoom = (id: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(playRoomRef).doc(id).delete().then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    private helperGetPlayRoom = (doc: firebase.firestore.DocumentData): PlayRoom =>{
        return PlayRoom.From({
            id: doc.id,
            playerBlack: doc.get("playerBlack") ? User.From(doc.get("playerBlack.id"), doc.get("playerBlack.email")) : null,
            playerWhite: doc.get("playerWhite") ? User.From(doc.get("playerWhite.id"), doc.get("playerWhite.email")) : null,
            gameId: doc.get("gameId"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createPlayRoomUseCase = (): IPlayRoomUseCase => {
    return new PlayRoomUseCase();
};
