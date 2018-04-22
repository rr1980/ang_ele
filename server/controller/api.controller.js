"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var os_data_service_1 = require("../services/os-data.service");
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.userName = "rr1980";
        this.name = "Riesner";
        this.vorName = "Rene";
        this.auth = true;
    }
    return UserModel;
}());
;
var AppStateModel = /** @class */ (function () {
    function AppStateModel() {
        this.isLoading = false;
        this.isLoaded = false;
        this.user = new UserModel();
    }
    return AppStateModel;
}());
;
var appState = new AppStateModel();
var getAppState = function () {
    return appState;
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
    }
};
exports.io = io;
