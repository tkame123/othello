import {PlayRoom} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {GameStatus} from "../model/game";
import {handleErrorFirebaseFirestore} from "./error_handler_firebase";

const version: string = config().ver;
const playRoomsRef: string = `version/${version}/playroom`;
const gameRef: string = `version/${version}/game`;

export interface IPlayRoomUseCase {

    onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void;

    offPlayrooms(): void;

    getPlayRoom(id: string): Promise<PlayRoom | null>;

    getPlayRooms(): Promise<PlayRoom[]>;

    createPlayRoom(owner: User) : Promise<void>;

    createGameOnPlayRoom(id: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<PlayRoom>;

    deletePlayRoom(id: string): Promise<void>;
}

class PlayRoomUseCase implements IPlayRoomUseCase {

    private unsubscribePlayRooms: any;

    public onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void {
        this.unsubscribePlayRooms = firebase.firestore().collection(playRoomsRef).orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
            let playRooms: PlayRoom[] = [];
            querySnapshot.forEach((doc) => {
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

    public getPlayRoom = (id: string): Promise<PlayRoom | null> => {
        return new Promise<PlayRoom | null>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).doc(id).get().then((doc) => {
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
            firebase.firestore().collection(playRoomsRef).orderBy("createdAt", "desc").get().then((docs: firebase.firestore.QuerySnapshot) => {
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

    public createGameOnPlayRoom(id: string, boardSize: number, playerBlack: User, playerWhite: User): Promise<PlayRoom> {
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
                boardSize: boardSize,
                gameStatus: GameStatus.GameStatus_Playing,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then((ref: firebase.firestore.DocumentReference) => {
                return firebase.firestore().collection(playRoomsRef).doc(id).update({
                    gameId: ref.id,
                    updatedAt: new Date(),
                })
            }).then(() => {
                return firebase.firestore().collection(playRoomsRef).doc(id).get()
            }).then((doc: firebase.firestore.DocumentSnapshot) =>{
                const playRoom: PlayRoom = this.helperGetPlayRoom(doc);
                resolve(playRoom);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public deletePlayRoom = (id: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).doc(id).delete().then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    private helperGetPlayRoom = (doc: firebase.firestore.DocumentData): PlayRoom =>{
        return PlayRoom.From({
            id: doc.id,
            owner: User.From(doc.get("owner.id"), doc.get("owner.email")),
            gameId: doc.get("gameId"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createPlayRoomUseCase = (): IPlayRoomUseCase => {
    return new PlayRoomUseCase();
};
