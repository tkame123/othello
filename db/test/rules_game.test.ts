import * as firebase from "firebase";
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestore_test_provider';

const testName = 'firestore-emulator';
const provider = new FirestoreTestProvider(testName);

function getGameRef(db: firebase.firestore.Firestore) {
    return db.collection('/version/1/game')
}

describe(testName, () => {
    beforeEach(async () => {
        provider.increment();
        await provider.loadRules()
    });

    afterEach(async () => {
        await provider.cleanup()
    });

    describe('game collection test', () => {
        test('require users to login before create game', async () => {
            const db = provider.getFirestoreWithAuth(undefined);
            await ftest.assertFails(getGameRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should anyone in login create any game', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            await ftest.assertSucceeds(getGameRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should only player update any game(playerBlack)', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            const game = await getGameRef(db).add({
                playerBlack: {id: "testUser"},
                updatedAt: new Date(),
            });
            await ftest.assertSucceeds(game.update({
                updatedAt: new Date()
            }));
        });

        test('should only player update any game(playerWhite)', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            const game = await getGameRef(db).add({
                playerWhite: {id: "testUser"},
                updatedAt: new Date(),
            });
            await ftest.assertSucceeds(game.update({
                updatedAt: new Date()
            }));
        });

    });

});
