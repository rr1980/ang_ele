
export class AppStateModel {
    isLoading: boolean = false;
    isLoaded: boolean = false;
    user: UserModel = new UserModel();
};

//-----------------------------

export class CpuItemModel {
    use:number;
};

export class CpuModel {
    cpus: CpuItemModel[];
};

//-----------------------------

export class UserModel {
    userName: string;
    name: string;
    vorName: string;
    auth: boolean;
};

