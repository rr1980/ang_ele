
export class AppStateViewModel {
    isLoading: boolean = true;
    isLoaded: boolean = false;
    user: UserViewModel = new UserViewModel();
    cpu: CpuViewModel = new CpuViewModel();
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

