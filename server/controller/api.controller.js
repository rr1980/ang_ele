"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var os_data_service_1 = require("../services/os-data.service");
var db_data_service_1 = require("../services/db-data.service");
var UserResponseModel = /** @class */ (function () {
    function UserResponseModel() {
    }
    return UserResponseModel;
}());
;
var AppStateResponseModel = /** @class */ (function () {
    function AppStateResponseModel() {
        this.isLoading = false;
        this.isLoaded = false;
    }
    return AppStateResponseModel;
}());
;
var appState = new AppStateResponseModel();
if (!db_data_service_1.DbDataService.getAppState()) {
    console.info("\r\n \r\n seed data... \r\n");
    db_data_service_1.DbDataService.seed();
}
var validateLogin = function (arg) {
    var result = db_data_service_1.DbDataService.getUser(arg);
    var auth = arg.username === "rr1980" && arg.password === "test";
    return {
        userName: auth ? result.userName : "",
        name: auth ? result.name : "",
        vorName: auth ? result.vorName : "",
        auth: auth
    };
};
var getAppState = function () {
    var result = db_data_service_1.DbDataService.getAppState();
    return {
        isLoading: result.isLoading,
        isLoaded: result.isLoaded
    };
};
var win;
var io = {
    init: function (_win) {
        win = _win;
        setInterval(function () {
            win.webContents.send('setCpus', os_data_service_1.OsDataService.getCpus());
        }, 2000);
        electron_1.ipcMain.on('getInit', function (event, arg) {
            console.log('getInit called...');
            event.sender.send('getInit', getAppState());
        });
        electron_1.ipcMain.on('tryLogin', function (event, arg) {
            console.log('tryLogin called...', arg, validateLogin(arg));
            event.sender.send('setLogin', validateLogin(arg));
        });
    }
};
exports.io = io;
