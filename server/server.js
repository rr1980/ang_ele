"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var api_controller_1 = require("./controller/api.controller");
var Server;
(function (Server) {
    function init() {
        var win, serve;
        var args = process.argv.slice(1);
        serve = args.some(function (val) { return val === '--serve'; });
        try {
            require('dotenv').config();
        }
        catch (_a) {
            console.log('asar');
        }
        function createWindow() {
            var electronScreen = electron_1.screen;
            var size = electronScreen.getPrimaryDisplay().workAreaSize;
            // Create the browser window.
            win = new electron_1.BrowserWindow({
                x: 0,
                y: 0,
                width: size.width,
                height: size.height
            });
            if (serve) {
                require('electron-reload')(__dirname, {
                    // electron: require(`${__dirname}/node_modules/electron`)
                    electron: require(path.join(__dirname, '../', 'node_modules', 'electron'))
                });
                win.loadURL('http://localhost:4200');
            }
            else {
                win.loadURL(url.format({
                    // pathname: path.join(__dirname, 'dist/index.html'),
                    pathname: path.join(__dirname, '../', 'dist', 'index.html'),
                    protocol: 'file:',
                    slashes: true
                }));
            }
            win.webContents.openDevTools();
            // Emitted when the window is closed.
            win.on('closed', function () {
                // Dereference the window object, usually you would store window
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                win = null;
            });
        }
        try {
            api_controller_1.io.init();
            // This method will be called when Electron has finished
            // initialization and is ready to create browser windows.
            // Some APIs can only be used after this event occurs.
            electron_1.app.on('ready', createWindow);
            // Quit when all windows are closed.
            electron_1.app.on('window-all-closed', function () {
                // On OS X it is common for applications and their menu bar
                // to stay active until the user quits explicitly with Cmd + Q
                if (process.platform !== 'darwin') {
                    electron_1.app.quit();
                }
            });
            electron_1.app.on('activate', function () {
                // On OS X it's common to re-create a window in the app when the
                // dock icon is clicked and there are no other windows open.
                if (win === null) {
                    createWindow();
                }
            });
        }
        catch (e) {
            console.error(e);
            // Catch Error
            // throw e;
        }
    }
    Server.init = init;
})(Server = exports.Server || (exports.Server = {}));
// export default function(){
// let win, serve;
// const args = process.argv.slice(1);
// serve = args.some(val => val === '--serve');
// try {
//   require('dotenv').config();
// } catch {
//   console.log('asar');
// }
// function createWindow() {
//   const electronScreen = screen;
//   const size = electronScreen.getPrimaryDisplay().workAreaSize;
//   // Create the browser window.
//   win = new BrowserWindow({
//     x: 0,
//     y: 0,
//     width: size.width,
//     height: size.height
//   });
//   if (serve) {
//     require('electron-reload')(__dirname, {
//       // electron: require(`${__dirname}/node_modules/electron`)
//       electron: require(path.join(__dirname, '../', 'node_modules', 'electron'))
//     });
//     win.loadURL('http://localhost:4200');
//   } else {
//     win.loadURL(url.format({
//       // pathname: path.join(__dirname, 'dist/index.html'),
//       pathname: path.join(__dirname, '../', 'dist', 'index.html'),
//       protocol: 'file:',
//       slashes: true
//     }));
//   }
//   win.webContents.openDevTools();
//   // Emitted when the window is closed.
//   win.on('closed', () => {
//     // Dereference the window object, usually you would store window
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     win = null;
//   });
// }
// try {
//   io.init();
//   // This method will be called when Electron has finished
//   // initialization and is ready to create browser windows.
//   // Some APIs can only be used after this event occurs.
//   app.on('ready', createWindow);
//   // Quit when all windows are closed.
//   app.on('window-all-closed', () => {
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform !== 'darwin') {
//       app.quit();
//     }
//   });
//   app.on('activate', () => {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (win === null) {
//       createWindow();
//     }
//   });
// } catch (e) {
//   console.error(e);
//   // Catch Error
//   // throw e;
// }
// }
