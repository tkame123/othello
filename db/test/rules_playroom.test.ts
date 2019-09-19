import * as firebase from "firebase";
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestore_test_provider';

const testName = 'firestore-emulator';
const provider = new FirestoreTestProvider(testName);

function getPlayRoomRef(db: firebase.firestore.Firestore) {
    return db.collection('/version/1/playroom')
}

describe(testName, () => {
    beforeEach(async () => {
        provider.increment();
        await provider.loadRules()
    });

    afterEach(async () => {
        await provider.cleanup()
    });

    describe('playroom collection test', () => {
        test('require users to login before create playroom', async () => {
            const db = provider.getFirestoreWithAuth(undefined);
            await ftest.assertFails(getPlayRoomRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should anyone in login create any playroom', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            await ftest.assertSucceeds(getPlayRoomRef(db).add({
                updatedAt: new Date(),
                createdAt: new Date(),
            }));
        });

        test('should only limited player update playroom: プレイヤーの解除は自分自身のみ(Success)', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            const playroom = await getPlayRoomRef(db).add({
                playerBlack: {id: "testUser"},
                playerWhite: null,
                updatedAt: new Date(),
            });
            await ftest.assertSucceeds(playroom.update({
                playerBlack: null,
                updatedAt: new Date()
            }));
        });

        test('should only limited player update playroom: プレイヤーの解除は自分自身のみ(Fail)', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            const playroom = await getPlayRoomRef(db).add({
                playerBlack: {id: "testUserAnother"},
                playerWhite: null,
                updatedAt: new Date(),
            });
            await ftest.assertFails(playroom.update({
                playerBlack: null,
                updatedAt: new Date()
            }));
        });

        test('should only limited player update playroom: WhiteとBlackは別々のPlayerとなる(Success)', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            const playroom = await getPlayRoomRef(db).add({
                playerBlack: {id: "testUserAnother"},
                playerWhite: null,
                updatedAt: new Date(),
            });
            await ftest.assertSucceeds(playroom.update({
                playerWhite: {id: "testUser"},
                updatedAt: new Date()
            }));
        });

        test('should only limited player update playroom: WhiteとBlackは別々のPlayerとなる(Fail)', async () => {
            const db = provider.getFirestoreWithAuth({uid: "testUser"});
            const playroom = await getPlayRoomRef(db).add({
                playerBlack: {id: "testUser"},
                playerWhite: null,
                updatedAt: new Date(),
            });
            await ftest.assertFails(playroom.update({
                playerWhite: {id: "testUser"},
                updatedAt: new Date()
            }));
        });

    });

});
