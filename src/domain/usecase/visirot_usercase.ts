import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {handleErrorFirebaseFirestore} from "./error_handler_firebase";
import {Visitor} from "../model/visitor";

const version: string = config().ver;
const visitorsRef: string = `version/${version}/visitor`;

export interface IVisitorUseCase {

    onVisitors(callback: (visitors: Visitor[]) => void): void;

    offVisitors(): void;

    getVisitor(userId: string) : Promise<Visitor | null>;

    createVisitor(userId: string, playRoomId: string | null) : Promise<void>;

    updateVisitor(userId: string, playRoomId: string | null) : Promise<void>;

    deleteVisitor(userId: string): Promise<void>;

}

class VisitorUseCase implements IVisitorUseCase {

    private unsubscribeVisitors: any;

    public onVisitors(callback: (visitors: Visitor[]) => void): void {
        this.unsubscribeVisitors = firebase.firestore().collection(visitorsRef)
            .orderBy("updatedAt", "desc").onSnapshot((querySnapshot) => {
                let visitors: Visitor[] = [];
                querySnapshot.forEach((doc) => {
                    const visitor: Visitor = this.helperGetVisitor(doc);
                    visitors.push(visitor);
                });

                callback(visitors)
            }, (error: any) => {
                throw handleErrorFirebaseFirestore(error);
            });
    };

    public offVisitors(): void {
        this.unsubscribeVisitors();
    }

    public getVisitor = (id: string): Promise<Visitor | null> => {
        return new Promise<Visitor | null>((resolve, reject) => {
            firebase.firestore().collection(visitorsRef).doc(id).get()
                .then((doc: firebase.firestore.DocumentSnapshot) => {
                    if (!doc.exists) { resolve(null)}
                    const visitor: Visitor = this.helperGetVisitor(doc);
                    resolve(visitor);
                }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public createVisitor = (userId: string, playRoomId: string | null): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(visitorsRef).doc(userId).set({
                playRoomId: playRoomId,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public updateVisitor = (userId: string, playRoomId: string | null): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(visitorsRef).doc(userId).update({
                playRoomId: playRoomId,
                updatedAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public deleteVisitor = (userId: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(visitorsRef).doc(userId).delete()
                .then(() => {
                    resolve();
                }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    private helperGetVisitor = (doc: firebase.firestore.DocumentData): Visitor =>{
        return Visitor.From({
            userId: doc.id,
            playRoomId: doc.get("playRoomId"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createVisitorUseCase = (): IVisitorUseCase => {
    return new VisitorUseCase();
};
