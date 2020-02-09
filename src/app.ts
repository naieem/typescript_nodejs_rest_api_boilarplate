import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import HomeRoute from "./routes";
import DBconfig from "./dbconfig";
import Config from "./config";
import cors from "cors";
var cors = require("cors");
class AppBootStrapper {
  app: any;
  constructor() {
    this.app = express();
    this.initialSetup();
    this.routeSetup();
    this.bootstrap();
    this.configureDatabase();
  }
  initialSetup = () => {
    this.app.use(logger("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ title: "error" });
    });
  };
  routeSetup = () => {
    this.app.use("/", new HomeRoute().init());
  };
  bootstrap = () => {
    this.app.listen(Config.serverListeningPort, function() {
      console.log("connected to port "+Config.serverListeningPort);
    });
  };
  configureDatabase = () => {
    new DBconfig();
  };
}
new AppBootStrapper();
