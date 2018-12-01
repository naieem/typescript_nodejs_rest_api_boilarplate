import * as mongoose from 'mongoose';
class DBconfig {
    private connectionTester : any;
    constructor() {
        mongoose.connect('mongodb://localhost/test');
        this.connectionTester = mongoose.connection;
        this.connect();
    }
    private connect = () => {
        this
            .connectionTester
            .on('error', console.error.bind(console, 'connection error:'));
        this
            .connectionTester
            .once('open', function () {
                console.log('connected to db');
            });
    }
}

export default DBconfig;