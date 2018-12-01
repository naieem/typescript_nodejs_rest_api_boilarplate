import * as fs from 'fs';
import * as faker from 'faker';
import * as bcrypt from 'bcryptjs';
import Appconfig from '../config';
import UserModel from "./../model/user.model";
class AuthController {
    private userModel;
    private salt:any;
    constructor() {
        this.userModel = new UserModel();
    }
    /**
     * handle route controller call and then registers user
     */
    register = (req : any, res : any) => {
        
        this.checkingExistingUserByEmail(req.body.email, (result : boolean) => {
            
            if (!result) {
                this.createNewUser(req.body, (result : any) => {
                    
                    res.json(200, result);
                });
            } else {
                res.json(200, {message: 'an user already exists with this email'});
            }
        });
    }
    userLogin = (req : any, res : any) => {
        let password = bcrypt.hashSync(req.body.password, Appconfig.UserSalt);
        
        this.userModel.find({email:req.body.email,password:password},'email -_id',(err,user)=>{
            
            if(err){
                res.json(200,{
                    status:false,
                    data:err
                });
            }
            else if(user && user.length){
                res.json(200,{
                    status:true,
                    data:user
                });
            }else{
                res.json(200,{
                    status:false,
                    data:'no user found with the given information'
                });
            }
        });
    }
    /**
     * checking if user already exists by given email
     */
    checkingExistingUserByEmail = (email : string, callback) => {
        this
            .userModel
            .find({
                email: email
            }, (err, user) => {
                
                if (user && user.length) {
                    return callback(1);
                } else {
                    return callback(0);
                }
            });
    }
    /**
     * creating new user
     */
    createNewUser = (info : any, callback : any) => {
        
        const registermodel = new this.userModel(info);
        registermodel._id = faker
            .random
            .uuid();
        registermodel.password = bcrypt.hashSync(info.password, Appconfig.UserSalt);
        return registermodel.save((err, user) => {
            
            if (err) {
                return callback({status: 0, ErrorMessage: err});
            } else {
                return callback({status: true, data: user});
            }
        });
    }
}
export default AuthController;