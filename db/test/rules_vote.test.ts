import * as firebase from "firebase";
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestore_test_provider';

const testName = 'firestore-emulator';
const provider = new FirestoreTestProvider(testName);

function getVoteRef(db: firebase.firestore.Firestore) {
    return db.collection('/version/1/playroom/1/vote')
}

describe(testName, () => {
    beforeEach(async () => {
        provider.increment();
        await provider.loadRules()
    });

    afterEach(async () => {
        await provider.cleanup()
    });

    describe('vote collection test', () => {
        test('require users to login before create vote', async () => {
            const db = provider.getFirestoreWithAuth(undefined);
            await ftest.assertFails(getVoteRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should anyone in login create any vote', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            await ftest.assertSucceeds(getVoteRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

    });

});
