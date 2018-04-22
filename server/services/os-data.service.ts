
import * as os from "os";

export class CpuItemModel {
    constructor(private use: number) { }
};

export class CpuModel {
    constructor(private cpus: CpuItemModel[]) { }
};


function delta() {
    const cpus = os.cpus()

    return cpus.map(cpu => {
        const times = cpu.times
        return {
            tick: Object.keys(times).filter(time => time !== 'idle').reduce((tick, time) => { tick += times[time]; return tick }, 0),
            idle: times.idle,
        }
    })
}

var startMeasures: any = null;
var timer;


let OsDataService = {
    getCpusFeed: function (cb: any) {
        if (!timer) {
            timer = setInterval(() => {
                cb(this.getCpus());
            }, 2000);
        }
        else{
            cb(this.getCpus());
        }
    },

    getCpus: function (): CpuModel {

        if (startMeasures === null) {
            startMeasures = delta();
        }

        const endMeasures = delta()
        const percentageCPU = endMeasures.map((end, i) => {
            return new CpuItemModel(Math.round(((end.tick - startMeasures[i].tick) / (end.idle - startMeasures[i].idle) * 100)))
        })

        startMeasures = delta();
        return new CpuModel(percentageCPU);
    },

    stop: function(){
        clearInterval(timer);
        timer = null;
    }
}

export { OsDataService }