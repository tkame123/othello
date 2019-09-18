import * as Express from "express";
import {IAuthRequest} from "./auth";

const logger = (req: IAuthRequest, res: Express.Response, next: Express.NextFunction) => {
    console.log(`LOGGED Headers:${JSON.stringify(req.headers)}`);
    console.log(`LOGGED Body:${JSON.stringify(req.body)}`);
    console.log(`LOGGED Auth:${JSON.stringify(req.auth)}`);
    next();
};

export default logger;
