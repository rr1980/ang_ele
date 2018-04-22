"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
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
var io = {
    init: function () {
        electron_1.ipcMain.on('getInit', function (event, arg) {
            console.log('getInit:', event, JSON.stringify(arg));
            event.sender.send('getInit', appState);
        });
    }
};
exports.io = io;
