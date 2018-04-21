"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var io = {
    init: function () {
        electron_1.ipcMain.on('getInit', function (event, arg) {
            console.log('getInit:', event, JSON.stringify(arg));
            event.sender.send('getInit', { name: 'Klaus!' });
        });
    }
};
exports.io = io;
