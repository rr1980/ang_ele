
export class AppStateViewModel {
    isLoading: boolean = false;
    isLoaded: boolean = false;
    readonly user: UserViewModel = new UserViewModel();
};

//-----------------------------

export class CpuItemModel {
    use:number;
};

export class CpuViewModel {
    cpus: CpuItemModel[];
};

//-----------------------------

export class UserViewModel {
    userName: string;
    name: string;
    vorName: string;
    auth: boolean;
};

