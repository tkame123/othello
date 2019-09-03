import firebase from 'firebase/app';
import 'firebase/firestore';
import {config} from "../../util/config";
import {Cell, GameDetail, TParamsGameDetailFrom} from "../model/game_detail";

const version: string = config().ver;
const gameDetailRef: string = `version/${version}/gameDetail`;

export interface IAdminGameDetailUseCase {

    connectGameDetail(id:string) : Promise<GameDetail[]>;

    // onGameDetailDiff(id: string, callback: (ameDetail: GameDetail) => void): void;

    addGameDetail(id: string, turn: number, cell: Cell) : Promise<void>;

}

class AdminGameDetailUseCase implements IAdminGameDetailUseCase {

    private gameDetails: GameDetail[] = [];

    public connectGameDetail = (id:string): Promise<GameDetail[]> => {
        const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(id);
        return new Promise<GameDetail[]>((resolve, reject) => {
            ref.collection("move").orderBy("turn").get().then((docs: firebase.firestore.QuerySnapshot) => {
                let gameDetails: GameDetail[] = [];
                docs.forEach((doc: firebase.firestore.DocumentData) => {
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

    // public onGameDetailDiff(id: string, callback: (cell: Cell) => void): void {
    //     const ref: firebase.firestore.DocumentReference = firebase.firestore().collection(gameDetailRef).doc(id);
    //     ref.onSnapshot((docs: firebase.firestore.DocumentSnapshot) => {
    //
    //     })
    // }

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
