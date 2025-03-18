import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
    async handle(req: Request, resp: Response) {
        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute();
        return resp.json(user);
    }
}
export { DetailUserController }
