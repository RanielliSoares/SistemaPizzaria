
import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';

const router = Router();

//** ROTAS USER **/

//rota de cadastro de usuário
router.post('/users',new CreateUserController().handle);

//rota de login
router.post('/session',new AuthUserController().handle);


export default router;