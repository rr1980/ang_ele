import { ipcMain } from 'electron';

let io =  {

    init: function () {

        ipcMain.on('getInit', (event, arg) => {
            console.log('getInit:', event, JSON.stringify(arg));
            event.sender.send('getInit', { name: 'Klaus!' });
        })

    }
}

export {io}