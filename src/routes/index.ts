import * as express from 'express';
import AuthController from '../controller/auth.controller';
class HomeRoute {
    private router : any;
    private authController : any;
    constructor() {
        this.router = express.Router();
        this.authController = new AuthController();
    }
    init() {
        this
            .router
            .get('/', function (req, res, next) {
                debugger
                console.log('------------------------------------');
                console.log('hello world');
                console.log('------------------------------------');
                res.json(200, {title: 'hukka'});
            });
        this
            .router
            .post('/register', this.authController.register);
        this
            .router
            .post('/login', this.authController.userLogin);
        return this.router;
    }
}

export default HomeRoute;