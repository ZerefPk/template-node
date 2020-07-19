import {Router, request, response} from 'express';

//router import
import usersRouter from './users.routes';
import authenticationRouter from './authentication.routes'

//middleware import
import auth from '../middlewares/auth';

const routes = Router();


routes.get('/', auth, async (request, response) => {
  response.json( { er:"ppsps" } );
});
routes.use('/users', usersRouter);
routes.use('/authentication', authenticationRouter);


export default routes;
