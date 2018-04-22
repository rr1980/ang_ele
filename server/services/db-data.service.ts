
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync('./server/db/db.json')
const db = low(adapter)



export class AppStateModel {
    isLoading: boolean = false;
    isLoaded: boolean = false;
};

export class User{
    userName: string = "rr1980";
    name: string = "Riesner";
    vorName: string = "Rene";
    pw: string = "test";
}

let DbDataService = {

    seed: function () {
        db.defaults({ appState: new AppStateModel(), users:[new User()] })
            .write();
    },

    getAppState: function (): AppStateModel {
        return db.get("appState")
            .value();
    },

    getUser: function (arg): User {
        return db.get("users")
            .value()[0];
    }
}

export { DbDataService }