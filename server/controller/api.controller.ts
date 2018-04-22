import { ipcMain, BrowserWindow } from 'electron';
import { OsDataService } from '../services/os-data.service';

class UserModel {
    userName: string = "rr1980";
    name: string = "Riesner";
    vorName: string = "Rene";
    auth: boolean = true;
};

class AppStateModel {
    isLoading: boolean = false;
    isLoaded: boolean = false;
    user: UserModel = new UserModel();
};

const appState: AppStateModel = new AppStateModel();


const getAppState = function () {
    return appState;
}

var win: BrowserWindow;

let io = {

    init: function (_win: BrowserWindow) {
        win = _win;
        setInterval(() => {
            win.webContents.send('setCpus', OsDataService.getCpus());
        }, 2000);

        ipcMain.on('getInit', (event, arg) => {
            console.log('getInit called...');
            event.sender.send('getInit', getAppState());
        })

    }
}

export { io }
