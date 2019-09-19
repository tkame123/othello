import * as firebase from "firebase";
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestore_test_provider';

const testName = 'firestore-emulator';
const provider = new FirestoreTestProvider(testName);

function getVisitorRef(db: firebase.firestore.Firestore) {
    return db.collection('/version/1/visitor')
}

describe(testName, () => {
    beforeEach(async () => {
        provider.increment();
        await provider.loadRules()
    });

    afterEach(async () => {
        await provider.cleanup()
    });

    describe('visitor collection test', () => {
        test('should anyone create any visitor', async () => {
            const db = provider.getFirestoreWithAuth(undefined);
            const visitor = getVisitorRef(db).doc("testUser");
            await ftest.assertSucceeds(visitor.set({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });
    });

});
