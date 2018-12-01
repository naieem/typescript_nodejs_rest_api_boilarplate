import * as mongoose from 'mongoose';
class UserModel {
    private Schema : any
    constructor() {
        this.Schema = mongoose.Schema;
        return this.init();
    }
    init = () => {
        const uSchema = new this.Schema({
            _id: String,
            email: String,
            password: String,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }, {_id: false});
        return mongoose.model('user', uSchema);
    }
}
export default UserModel;