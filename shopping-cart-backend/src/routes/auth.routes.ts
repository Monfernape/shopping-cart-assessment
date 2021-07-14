import { AuthController } from '../controllers';
import BaseRoute from './base.routes';

export class AuthRoute extends BaseRoute {
    public init() {
        this.post('/login', AuthController.login);
        this.post('/signup', AuthController.signUp)

        return this.router;
    }
}