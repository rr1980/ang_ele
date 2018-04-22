
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { AppStateModel } from "../../src/app/models/app-state.model";

const adapter = new FileSync('./server/db/db.json')
const db = low(adapter)

let DbDataService = {

    seed: function (appStateModel: AppStateModel) {
        db.defaults({ appState: appStateModel })
            .write();
    },

    getAppState: function (): AppStateModel {
        return db.get("appState")
            .value();
    }
}

export { DbDataService }