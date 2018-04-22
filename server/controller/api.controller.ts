import { ipcMain, BrowserWindow } from 'electron';
import { OsDataService } from '../services/os-data.service';
import { DbDataService, User } from '../services/db-data.service';


class UserResponseModel {
    userName: string;
    name: string;
    vorName: string;
    auth: boolean;
};

class AppStateResponseModel {

    constructor() { }

    public isLoading: boolean = false;
    public isLoaded: boolean = false;
};

const appState: AppStateResponseModel = new AppStateResponseModel();


if (!DbDataService.getAppState()) {
    console.info("\r\n \r\n seed data... \r\n");
    DbDataService.seed();
}

const validateLogin = function (arg): UserResponseModel {
    var result = DbDataService.getUser(arg);

    var auth = arg.username === "rr1980" && arg.password === "test";

    return {
        userName: auth ? result.userName : "",
        name: auth ? result.name : "",
        vorName: auth ? result.vorName : "",
        auth:auth
    } as UserResponseModel;
}

const getAppState = function (): AppStateResponseModel {

    var result = DbDataService.getAppState();
    return {
        isLoading: result.isLoading,
        isLoaded: result.isLoaded
    } as AppStateResponseModel;
}

var win: BrowserWindow;
var timer;

let io = {

    init: function (_win: BrowserWindow) {
        win = _win;


        ipcMain.on('getInit', (event, arg) => {
            console.log('getInit called...');
            event.sender.send('getInit', getAppState());

        })

        ipcMain.on('tryLogin', (event, arg) => {
            console.log('tryLogin called...', arg, validateLogin(arg));

            event.sender.send('setLogin', validateLogin(arg));
        })

        ipcMain.on('setCpuFeedOn', (event, arg) => {
            timer = setInterval(() => {
                win.webContents.send('setCpus', OsDataService.getCpus());
            }, 2000);
        })

        ipcMain.on('setCpuFeedOff', (event, arg) => {
            clearInterval(timer);
        })
    }
}

export { io }
