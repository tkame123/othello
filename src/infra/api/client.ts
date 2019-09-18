import Axios, {Method} from 'axios';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {config} from "../../util/config";
import {handleError} from "./error_handler_response";

export interface IApiClient {
    getWithToken(path: string, token: string, body: string): Promise<string>;

    postWithToken(path: string, token: string, body: string): Promise<string>;
}

export class ApiClient implements IApiClient {
    private baseURL: string = config().api.firebase;

    public getWithToken(path: string, token: string, body: string): Promise<string> {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };

        return this.request('GET', path, headers, body);
    }

    public postWithToken(path: string, token: string, body: string): Promise<string> {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        };

        return this.request('POST', path, headers, body);
    }

    private request(method: Method, path: string, headers: any, body: string): Promise<string> {

        const option: AxiosRequestConfig = {
            headers,
            method : method,
            url: this.baseURL + path,
            data: body,
        };

        return Axios(option)
            .then( (res: AxiosResponse): Promise<string> => {
                handleError(res);
                return res.data
            }).catch((error: AxiosError) => {
                if (error.response) {
                    // 2xx系以外のエラーハンドリング
                    throw error;
                } else if (error.request){
                    // リクエストが返らない来ない場合のエラーハンドリング
                    throw error;
                } else {
                    // その他
                    throw error;
                }
            });

    }

}

export const createApiClient = (): IApiClient => {

    return new ApiClient();

};
