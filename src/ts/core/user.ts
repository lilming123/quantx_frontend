import {IPerson} from "@/ts/core/preson";

export class UserProvider {
    private _user: IPerson|undefined;
    get user(): IPerson | undefined {
        return this._user
    }
    public loadUser(person: IPerson) {
        this._user = person
    }
    constructor(user: IPerson|undefined) {
        this._user = user
    }
}