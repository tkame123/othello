import {PlayRoom, TParamsPlayRoomsFromFS} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {User} from "../model/user";

const version: string = config().ver;
const playRoomsRef: string = `version/${version}/playroom`;

export interface IPlayRoomUseCase {

    onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void;

    getPlayRoom(id: string): Promise<PlayRoom | null>;

    getPlayRooms(): Promise<PlayRoom[]>;

    createPlayRoom(owner: User) : Promise<void>;

}

class PlayRoomUseCase implements IPlayRoomUseCase {

    public onPlayRooms(callback: (playRooms: PlayRoom[]) => void): void {
        firebase.firestore().collection(playRoomsRef).onSnapshot((querySnapshot) => {
            console.log(querySnapshot);
            let playRooms: PlayRoom[] = [];
            querySnapshot.forEach((doc) => {
                const params: TParamsPlayRoomsFromFS ={
                    id: doc.id,
                    ownerId: doc.data().owner.userId,
                    ownerEmail: doc.data().owner.email,
                    // ToDo: あとで
                    game: null,
                    updatedAt: doc.data().updatedAt,
                    createdAt: doc.data().createdAt,
                };
                const playRoom: PlayRoom = PlayRoom.FromFS(params);
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
                if (doc) { resolve(null)}

                // const params: TParamsPlayRoomsFromFS ={
                //     id: doc.id,
                //     ownerId: doc.data().owner.userId,
                //     ownerEmail: doc.data().owner.email,
                //     // ToDo: あとで
                //     game: null,
                //     updatedAt: doc.data().updatedAt,
                //     createdAt: doc.data().createdAt,
                // };
                // const playRoom: PlayRoom = PlayRoom.FromFS(params);
                resolve(null);
            }).catch((e: any) => {
                reject(e);
            });
        });
    };

    public getPlayRooms = (): Promise<PlayRoom[]> => {

        return new Promise<PlayRoom[]>((resolve, reject) => {
            firebase.firestore().collection(playRoomsRef).get().then((querySnapshot) => {
                let playRooms: PlayRoom[] = [];
                querySnapshot.forEach((doc) => {
                    const params: TParamsPlayRoomsFromFS ={
                        id: doc.id,
                        ownerId: doc.data().owner.userId,
                        ownerEmail: doc.data().owner.email,
                        // ToDo: あとで
                        game: null,
                        updatedAt: doc.data().updatedAt,
                        createdAt: doc.data().createdAt,
                    };
                    const playRoom: PlayRoom = PlayRoom.FromFS(params);
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
            const userId: string = owner.id;
            const email: string = owner.email;
            firebase.firestore().collection(playRoomsRef).add({
                owner: {
                    userId: userId,
                    email: email,
                },
                game: null,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(error);
            })
        });
    };

}

export const createPlayRoomUseCase = (): IPlayRoomUseCase => {
    return new PlayRoomUseCase();
};
