import * as firebase from "firebase";
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestore_test_provider';

const testName = 'firestore-emulator';
const provider = new FirestoreTestProvider(testName);

function getScoreRef(db: firebase.firestore.Firestore) {
    return db.collection('/version/1/score')
}

describe(testName, () => {
    beforeEach(async () => {
        provider.increment();
        await provider.loadRules()
    });

    afterEach(async () => {
        await provider.cleanup()
    });

    describe('score collection test', () => {
        test('require users to login before create score', async () => {
            const db = provider.getFirestoreWithAuth(undefined);
            await ftest.assertFails(getScoreRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should anyone in login create any score', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            await ftest.assertSucceeds(getScoreRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

    });

});
