
export class AppStateModel {
    isLoading: boolean = false;
    isLoaded: boolean = false;
    user: UserModel = new UserModel();
};

export class UserModel {
    userName: string;
    name: string;
    vorName: string;
    auth: boolean;
};

