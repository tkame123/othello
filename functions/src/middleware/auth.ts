import * as Express from "express";
import * as admin from "firebase-admin";

export interface IAuthRequest extends Express.Request {
    auth?: {
        uid?: string;
    }
}

const auth = async (req: IAuthRequest, res: Express.Response, next: Express.NextFunction) => {
    if (req.headers.authorization) {
        const match: RegExpMatchArray | null = req.headers.authorization.match(/^Bearer (.*)$/);
        if (match) {
            const idToken = match[1];
            try {
                const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(idToken);
                req.auth = { uid: decodedToken.uid };
            } catch (error) {
                console.error(error.message);
                res.status(401).send("Unauthorized");
                return
            }
        } else {
            res.status(401).send("Unauthorized");
            return
        }
    } else {
        res.status(401).send("Unauthorized");
        return
    }
    next();
};

export default auth;
