import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";
import {Cell, GameDetail} from "../model/game_detail";
import {handleErrorFirebaseFirestore} from "./error_handler_firebase";

const version: string = config().ver;
const gameDetailRef: string = `version/${version}/gameDetail`;

export interface IGameDetailUseCase {

    connectGameDetail(gameId:string) : Promise<GameDetail[]>;

    onGameDetailDiff(callback: (gameDetail: GameDetail) => void): void;

    offGameDetail(): void;

    setGameDetail(gameId: string, turn: number, cell: Cell) : Promise<void>;

}

class GameDetailUseCase implements IGameDetailUseCase {

    private unsubscribeGameDetail: any;
    private gameId: string = "";
    private gameDetails: GameDetail[] = [];

    public connectGameDetail = (gameId:string): Promise<GameDetail[]> => {

        this.gameId = gameId;
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(gameId);
        return new Promise<GameDetail[]>((resolve, reject) => {
            ref.collection("move").orderBy("turn").get().then((snapshot: firebase.firestore.QuerySnapshot) => {
                let gameDetails: GameDetail[] = [];
                snapshot.forEach((doc: firebase.firestore.DocumentData) => {
                    const gameDetail :GameDetail = this.helperGetGameDetail(doc);
                    gameDetails.push(gameDetail);
                });
                this.gameDetails = gameDetails;
                resolve(gameDetails);
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    public onGameDetailDiff(callback: (gameDetail: GameDetail) => void): void {
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(this.gameId);
        this.unsubscribeGameDetail = ref.collection("move").onSnapshot((docs: firebase.firestore.QuerySnapshot) => {
            docs.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
                if ( change.type === 'added' ) {
                    const gameDetail :GameDetail = this.helperGetGameDetail(change.doc);
                    const finded: GameDetail | undefined = this.gameDetails.find((item: GameDetail): boolean => {
                        return item.id === gameDetail.id;
                    });

                    if (finded) {
                        return;
                    }

                    this.gameDetails.push(gameDetail);
                    callback(gameDetail);
                }
            });
        })
    }

    public offGameDetail(): void {
        this.unsubscribeGameDetail();
    }

    public setGameDetail = (gameId: string, turn: number, cell: Cell): Promise<void> =>{
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(gameId).collection("move").doc();
        return new Promise<void>((resolve, reject) => {
            ref.set({
                turn: turn,
                cell: {x: cell.x, y: cell.y},
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(handleErrorFirebaseFirestore(error));
            })
        });
    };

    private helperGetGameDetail = (doc: firebase.firestore.DocumentData): GameDetail =>{
        return GameDetail.From({
            id: doc.id,
            turn: doc.get("turn"),
            cell: {x: doc.get("cell.x"), y: doc.get("cell.y")},
            updatedAt: doc.get("updatedAt").toDate(),
            createdAt: doc.get("createdAt").toDate(),
        });
    };

}

export const createGameDetailUseCase = (): IGameDetailUseCase => {
    return new GameDetailUseCase();
};
