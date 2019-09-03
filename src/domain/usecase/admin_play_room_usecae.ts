import {PlayRoom, TParamsPlayRoomFrom} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";
import {GameStatus} from "../model/game";

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
                const params: TParamsPlayRoomFrom ={
                    id: doc.id,
                    owner: User.From(doc.get("owner.userId"), doc.get("owner.email")),
                    gameId: doc.get("gameId"),
                    updatedAt: doc.get("updatedAt").toDate(),
                    createdAt: doc.get("createdAt").toDate(),
                };
                const playRoom: PlayRoom = PlayRoom.From(params);
                playRooms.push(playRoom);
            });

            callback(playRooms)
        }, (error: any) => {
            throw new Error(error);
        })
    };

    public getPlayRoom = (id: string): Promise<PlayRoom | null> => {
        return new Promise<PlayRoom | null>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).doc(id).get().then((doc) => {
                if (!doc.exists) { resolve(null)}

                const params: TParamsPlayRoomFrom ={
                    id: doc.id,
                    owner: User.From(doc.get("owner.userId"), doc.get("owner.email")),
                    gameId: doc.get("gameId"),
                    updatedAt: doc.get("updatedAt").toDate(),
                    createdAt: doc.get("createdAt").toDate(),
                };
                const playRoom: PlayRoom = PlayRoom.From(params);
                resolve(playRoom);
            }).catch((e: any) => {
                reject(e);
            });
        });
    };

    public getPlayRooms = (): Promise<PlayRoom[]> => {
        return new Promise<PlayRoom[]>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).get().then((docs: firebase.firestore.QuerySnapshot) => {
                let playRooms: PlayRoom[] = [];
                docs.forEach((doc) => {
                    const params: TParamsPlayRoomFrom ={
                        id: doc.id,
                        owner: User.From(doc.get("owner.userId"), doc.get("owner.email")),
                        gameId: doc.get("gameId"),
                        updatedAt: doc.get("updatedAt").toDate(),
                        createdAt: doc.get("createdAt").toDate(),
                    };
                    const playRoom: PlayRoom = PlayRoom.From(params);
                    playRooms.push(playRoom);
                });
                resolve(playRooms);
            }).catch((e: any) => {
                reject(e);
            });
        });
    };

    public createPlayRoom = (owner: User): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).add({
                owner: {
                    userId: owner.id,
                    email: owner.email,
                },
                gameId: null,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(error);
            })
        });
    };

    public createGameOnPlayRoom(id: string, playerWhite: User, playerBlack: User): Promise<PlayRoom> {
        return new Promise<PlayRoom>((resolve, reject) => {
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
                const gameId: string = ref.id;
                return firebase.firestore().collection(playRoomsRef).doc(id).update({
                    gameId: gameId,
                    updatedAt: new Date(),
                })
            }).then(() => {
                return firebase.firestore().collection(playRoomsRef).doc(id).get()
            }).then((doc: firebase.firestore.DocumentSnapshot) =>{
                const params: TParamsPlayRoomFrom ={
                    id: doc.id,
                    owner: User.From(doc.get("owner.userId"), doc.get("owner.email")),
                    gameId: doc.get("gameId"),
                    updatedAt: doc.get("updatedAt").toDate(),
                    createdAt: doc.get("createdAt").toDate(),
                };
                const playRoom: PlayRoom = PlayRoom.From(params);
                resolve(playRoom);
            }).catch((error: any) => {
                reject(error);
            })
        });
    };
}

export const createAdminPlayRoomUseCase = (): IAdminPlayRoomUseCase => {
    return new AdminPlayRoomUseCase();
};
