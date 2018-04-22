"use strict";
exports.__esModule = true;
var os = require("os");
var CpuItemModel = /** @class */ (function () {
    function CpuItemModel(use) {
        this.use = use;
    }
    return CpuItemModel;
}());
exports.CpuItemModel = CpuItemModel;
;
var CpuModel = /** @class */ (function () {
    function CpuModel(cpus) {
        this.cpus = cpus;
    }
    return CpuModel;
}());
exports.CpuModel = CpuModel;
;
function delta() {
    var cpus = os.cpus();
    return cpus.map(function (cpu) {
        var times = cpu.times;
        return {
            tick: Object.keys(times).filter(function (time) { return time !== 'idle'; }).reduce(function (tick, time) { tick += times[time]; return tick; }, 0),
            idle: times.idle
        };
    });
}
var startMeasures = null;
var OsDataService = {
    getCpus: function () {
        if (startMeasures === null) {
            startMeasures = delta();
        }
        var endMeasures = delta();
        var percentageCPU = endMeasures.map(function (end, i) {
            return new CpuItemModel(Math.round(((end.tick - startMeasures[i].tick) / (end.idle - startMeasures[i].idle) * 100)));
        });
        startMeasures = delta();
        return new CpuModel(percentageCPU);
    }
};
exports.OsDataService = OsDataService;
