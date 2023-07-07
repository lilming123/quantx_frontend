import {CalculateResult} from "@type/calculate";
import axios from "axios";
import API_URLS from "@cfg/api";
import {Strategy} from "@type/strategy";

class CalculateController {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private _data: Strategy;
    public async calculate(data: Strategy): Promise<CalculateResult>{
        this._data = data;
        // return await axios.post(API_URLS.BASE_URL + 'app/calculate/', data)
        return await axios.post(API_URLS.BASE_URL + 'app/calculate/')

    }
}

export default new CalculateController();