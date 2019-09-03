import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";
import {Cell, GameDetail, TParamsGameDetailFrom} from "../model/game_detail";

const version: string = config().ver;
const gameDetailRef: string = `version/${version}/gameDetail`;

export interface IAdminGameDetailUseCase {

    connectGameDetail(id:string) : Promise<GameDetail[]>;

    onGameDetailDiff(callback: (gameDetail: GameDetail) => void): void;

    addGameDetail(id: string, turn: number, cell: Cell) : Promise<void>;

}

class AdminGameDetailUseCase implements IAdminGameDetailUseCase {

    private gameId: string = "";
    private gameDetails: GameDetail[] = [];

    public connectGameDetail = (id:string): Promise<GameDetail[]> => {
        this.gameId = id;
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(id);
        return new Promise<GameDetail[]>((resolve, reject) => {
            ref.collection("move").orderBy("turn").get().then((snapshot: firebase.firestore.QuerySnapshot) => {
                let gameDetails: GameDetail[] = [];
                snapshot.forEach((doc: firebase.firestore.DocumentData) => {
                    const params: TParamsGameDetailFrom = {
                        id: doc.id,
                        turn: doc.get("turn"),
                        cell: {x: doc.get("cell.x"), y: doc.get("cell.y")},
                        updatedAt: doc.get("updatedAt").toDate(),
                        createdAt: doc.get("createdAt").toDate(),
                    };
                    gameDetails.push(GameDetail.From(params));
                });
                this.gameDetails = gameDetails;
                resolve(gameDetails);
            }).catch((error: any) => {
                reject(error);
            })
        });
    };

    public onGameDetailDiff(callback: (gameDetail: GameDetail) => void): void {
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(this.gameId);
        ref.collection("move").onSnapshot((docs: firebase.firestore.QuerySnapshot) => {
            docs.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
                if ( change.type === 'added' ) {
                    const params: TParamsGameDetailFrom = {
                        id: change.doc.id,
                        turn: change.doc.get("turn"),
                        cell: {x: change.doc.get("cell.x"), y: change.doc.get("cell.y")},
                        updatedAt: change.doc.get("updatedAt").toDate(),
                        createdAt: change.doc.get("createdAt").toDate(),
                    };
                    const gameDetail: GameDetail = GameDetail.From(params);

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

    public addGameDetail = (id: string, turn: number, cell: Cell): Promise<void> =>{
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(id).collection("move").doc();
        return new Promise<void>((resolve, reject) => {
            ref.set({
                turn: turn,
                cell: {x: cell.x, y: cell.y},
                updatedAt: new Date(),
                createdAt: new Date(),
            }).then(() =>{
                resolve();
            }).catch((error: any) => {
                reject(error);
            })
        });
    };

}

export const createAdminGameDetailUseCase = (): IAdminGameDetailUseCase => {
    return new AdminGameDetailUseCase();
};
