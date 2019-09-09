import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";

import {handleErrorFirebaseFirestore} from "./error_handler_firebase";
import {Vote, VoteEventType} from "../model/vote";

const version: string = config().ver;
const playRoomRef: string = `version/${version}/playroom`;

export interface IVoteUseCase {

    onVotesOnPlayRoom(playRoomId: string, callback: (votes: Vote[]) => void): void;

    offVoteOnPlayRoom(): void;

    createVoteOnPlayRoom(playRoomId: string, eventType: VoteEventType, userId: string, message: string): Promise<void>;

    deleteVotesOnPlayRoom(playRoomId: string, eventType: VoteEventType): Promise<void>;

}

class VoteUseCase implements IVoteUseCase {

    private unsubscribeVotes: any;

    public onVotesOnPlayRoom(playRoomId: string, callback: (votes: Vote[]) => void): void {
        this.unsubscribeVotes = firebase.firestore().collection(playRoomRef).doc(playRoomId).collection("vote").onSnapshot((docs: firebase.firestore.QuerySnapshot) => {
            let votes: Vote[] = [];
            docs.forEach((doc) => {
                const vote: Vote = this.helperVote(doc);
                votes.push(vote);
            });
            callback(votes)
        }, (error: any) => {
            throw handleErrorFirebaseFirestore(error);
        });
    };

    public offVoteOnPlayRoom(): void {
        this.unsubscribeVotes();
    }

    public createVoteOnPlayRoom = (playRoomId: string, eventType: VoteEventType, userId: string, message: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            firebase.firestore().collection(playRoomRef).doc(playRoomId).collection("vote").add({
                eventType: eventType,
                userId: userId,
                message: message,
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public deleteVotesOnPlayRoom = (playRoomId: string, eventType: VoteEventType): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const batch: firebase.firestore.WriteBatch = firebase.firestore().batch();
            const votesRef = firebase.firestore().collection(playRoomRef).doc(playRoomId).collection("vote").where("eventType", "==", eventType);
            votesRef.get().then((docs: firebase.firestore.QuerySnapshot) =>{
                docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit()
            }).then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    private helperVote = (doc: firebase.firestore.DocumentData): Vote =>{
        return Vote.From({
            id: doc.id,
            eventType: doc.get("eventType"),
            userId: doc.get("userId"),
            message: doc.get("message"),
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createVoteUseCase = (): IVoteUseCase => {
    return new VoteUseCase();
};
