import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../models/User';
import authConfig from '../../config/auth'
import AppError from '../../errors/AppError';


interface Request{
  email: string,
  password: string,
}

interface Responser {
  user: User;
  token: string
}
class LoginService {
  public async execute( { email, password  }:Request ): Promise<Responser>
  {
    const userRepository = getRepository(User);

    const user =  await userRepository.findOne({
      where: { email }
    });

    if (!user){
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    delete user.password;

    const token = sign({
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    }, authConfig.jwt.secret );
    return {
      user,
      token,
    }

  }
}

export default LoginService;
