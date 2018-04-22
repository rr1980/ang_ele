import { ipcMain, BrowserWindow } from 'electron';
import { OsDataService } from '../services/os-data.service';
import { DbDataService } from '../services/db-data.service';

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


if(!DbDataService.getAppState()){
    console.info("\r\n \r\n seed data... \r\n");
     DbDataService.seed(appState);
}


const getAppState = function () {
    return DbDataService.getAppState();
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
