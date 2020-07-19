import { Router, response } from 'express';

import CreateUserService from "../services/users/CreateUserService";

const usersRouter = Router();

usersRouter.post('/register', async (request, response) => {

  try {
    const {name, email, password} = request.body;

    const createUser = new CreateUserService;

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return response.send(user);
  } catch(err) {
    return response.status(400).json({error: err.message});
  }


});

export default usersRouter;
