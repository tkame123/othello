import * as firebase from "firebase";
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestore_test_provider';

const testName = 'firestore-emulator';
const provider = new FirestoreTestProvider(testName);

function getGameDetailRef(db: firebase.firestore.Firestore) {
    return db.collection('/version/1/gameDetail')
}

describe(testName, () => {
    beforeEach(async () => {
        provider.increment();
        await provider.loadRules()
    });

    afterEach(async () => {
        await provider.cleanup()
    });

    describe('gameDetail collection test', () => {
        test('require users to login before create gameDetail', async () => {
            const db = provider.getFirestoreWithAuth(undefined);
            await ftest.assertFails(getGameDetailRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should anyone in login create any gameDetail', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            await ftest.assertSucceeds(getGameDetailRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

    });

});
