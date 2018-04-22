"use strict";
exports.__esModule = true;
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync('./server/db/db.json');
var db = low(adapter);
var DbDataService = {
    seed: function (appStateModel) {
        db.defaults({ appState: appStateModel })
            .write();
    },
    getAppState: function () {
        return db.get("appState")
            .value();
    }
};
exports.DbDataService = DbDataService;
