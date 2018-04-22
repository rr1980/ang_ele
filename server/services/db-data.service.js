"use strict";
exports.__esModule = true;
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync('./server/db/db.json');
var db = low(adapter);
var AppStateModel = /** @class */ (function () {
    function AppStateModel() {
        this.isLoading = false;
        this.isLoaded = false;
    }
    return AppStateModel;
}());
exports.AppStateModel = AppStateModel;
;
var User = /** @class */ (function () {
    function User() {
        this.userName = "rr1980";
        this.name = "Riesner";
        this.vorName = "Rene";
        this.pw = "test";
    }
    return User;
}());
exports.User = User;
var DbDataService = {
    seed: function () {
        db.defaults({ appState: new AppStateModel(), users: [new User()] })
            .write();
    },
    getAppState: function () {
        return db.get("appState")
            .value();
    },
    getUser: function (arg) {
        return db.get("users")
            .value()[0];
    }
};
exports.DbDataService = DbDataService;
