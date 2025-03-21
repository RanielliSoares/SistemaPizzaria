
import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import {isAuthenticated} from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

const router = Router();

//** ROTAS USER **/

//rota de cadastro de usuário
router.post('/users',new CreateUserController().handle);

//rota de login
router.post('/session',new AuthUserController().handle);

//rota para detalhar um usuário
router.get('/me',isAuthenticated, new DetailUserController().handle);

/*** Rotas de Categorie */
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);


export default router;