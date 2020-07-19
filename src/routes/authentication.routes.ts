import { Router, request, response } from 'express';

import LoginService from  '../services/authentication/loginService';


const authenticationRouter = Router();

authenticationRouter.post('/login', async (request, response) => {

  try{
    const { email, password } = request.body;

    const loginService = new LoginService();

    const { user, token } = await loginService.execute({
      email,
      password,
    });

    return response.json({ user, token} );
  }catch(err){
    return response.status(400).json({ err: err.message });
  }

});


export default authenticationRouter;
