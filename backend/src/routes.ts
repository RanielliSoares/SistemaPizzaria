
import { Request, Response,Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';

const router = Router();
router.post('/users', (req: Request, res: Response) => {
    return new CreateUserController().handle(req, res); // CreateUserController.handle(req, res);
});

export default router;