import axios from "axios";
import API_URLS from "@cfg/api";
import {PassportResult} from "@type/passportResult";
import {UserProvider} from "@/ts/core/user";

class PassportController {
    private _provider: UserProvider;
    constructor() {
        this._provider = new UserProvider(undefined)
    }
    get logined(): boolean {
        return  this._provider.user != undefined;
    }

    get provider(): UserProvider {
        return this._provider
    }

    public async login(email: string, password: string): Promise<PassportResult>{
        const data = {
            email : email,
            password: password,
        };
        return await axios.post(API_URLS.BASE_URL + 'app/login/', data)
    }
    
    public async register(userName: string, password: string, email: string):Promise<PassportResult>{
        const data = {
            username : userName,
            password: password,
            email: email
        };
        return await axios.post(API_URLS.BASE_URL + 'app/register/', data)
    }

    public async resetPassword(email: string, newPassword: string):Promise<PassportResult>{
        const data = {
            email: email,
            password: newPassword,
        }
        return await  axios.post(API_URLS.BASE_URL+'app/forget/', data)
    }

    public async checkToken(token: string):Promise<PassportResult>{
        const data = {
            token: token
        }
        return await  axios.post(API_URLS.BASE_URL+'app/checkToken/', data)
    }

}

export default new PassportController();