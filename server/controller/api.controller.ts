import { ipcMain } from 'electron';

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

let io = {

    init: function () {

        ipcMain.on('getInit', (event, arg) => {
            console.log('getInit:', event, JSON.stringify(arg));
            event.sender.send('getInit', appState);
        })

    }
}

export { io }