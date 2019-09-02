import {User} from "../model/user";
import firebase from 'firebase/app';
import 'firebase/auth';

export interface IAuthUseCase {

    onAuth(callback: (user: User | null) => void): void;

    loginOnGoogle() : Promise<void>;

    logout(): Promise<void>;

    getAuthUser(): Promise<User | null >;

}

class AuthUseCase implements IAuthUseCase {

    public onAuth(callback: (user: User | null) => void): void {
        firebase.auth().onAuthStateChanged((firebaseUser: firebase.User | null) => {
            let user: User | null = null;
            if (firebaseUser && firebaseUser.email) {
                user = User.From(firebaseUser.uid, firebaseUser.email);
            }
            callback(user);
        }, (error: any) => {
            throw new Error(error);
        })
    }

    public loginOnGoogle = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    resolve();
                }).catch((error: any) => {
                    reject(error);
                })
        });
    };

    public logout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            firebase.auth().signOut()
                .then(()=> {
                    resolve();
                })
                .catch((error: any) =>{
                    reject(error);
                });
        });
    }

    public getAuthUser(): Promise<User | null >{
        return new Promise<User | null>((resolve) => {
            const firebaseUser: firebase.User | null = firebase.auth().currentUser;
            const user: User | null = (firebaseUser !== null && firebaseUser.email !== null)
                ? User.From(firebaseUser.uid, firebaseUser.email)
                : null;
            resolve(user);
        }).catch((error: any) => {
            throw new Error(error);
        });

    }

}

export const createAuthUseCase = (): IAuthUseCase => {
    return new AuthUseCase();
};
