import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as Express from "express";
import gameRouter from "./routes/game";
import auth from "./middleware/auth";
import logger from "./middleware/logger";

admin.initializeApp();
const app = Express();

app.use(auth);
app.use(logger);
app.use('/game', gameRouter);

const api = functions.https.onRequest(app);
export { api };
