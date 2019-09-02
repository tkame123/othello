import {PlayRoom} from "../model/play_room";import firebase from 'firebase/app';
import 'firebase/firestore';

import {User} from "../model/user";

export interface IPlayRoomUseCase {

    getPlayRooms(): Promise<PlayRoom[]>;

    createPlayRoom(ownerId: string) : Promise<PlayRoom>;

}

class PlayRoomUseCase implements IPlayRoomUseCase {

    public getPlayRooms = (): Promise<PlayRoom[]> => {

        return new Promise<PlayRoom[]>((resolve, reject) => {
            firebase.firestore().collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                });
                const playRooms: PlayRoom[] = [];
                resolve(playRooms);
            }).catch((e: any) => {
                reject(e);
            });
        });
    };

    public createPlayRoom = (ownerId: string): Promise<PlayRoom> => {

        return new Promise<PlayRoom>((resolve, reject) => {
            firebase.firestore().collection("users").add({
                first: "T",
                last: "K",
                born: 1978
            }).then((docRef: any) => {
                console.log(docRef);
                const playRoom: PlayRoom = PlayRoom.New(User.New("test@local"));
                resolve(playRoom);
            }).catch((error: any) => {
                reject(error);
            })
        });
    };

}

export const createPlayRoomUseCase = (): IPlayRoomUseCase => {
    return new PlayRoomUseCase();
};
