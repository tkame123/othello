import * as Express from "express";
const gameRouter: Express.Router = Express.Router();

gameRouter.get('/', (req: Express.Request, res: Express.Response) =>{
    res.send('game get');
});

export default gameRouter;
