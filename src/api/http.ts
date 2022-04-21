/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from 'axios';
import { IAPIConfig } from '../types';
import Logger from '../utils/logger';

const TIMEOUT = 30000;

interface IRefreshTokenParams { currentRefreshToken: string }
interface IRefreshTokenResponse { refreshToken: string, accessToken: string }
interface IMiddlewareParams { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, params?: Record<string, unknown> }

class HttpService {
    private token?: string;
    private config?: IAPIConfig;

    public setConfig(_c: IAPIConfig): void {
        this.config = _c;
    }

    public setToken(tkn: string): void {
        this.token = tkn;
    }

    public async get(url: string): Promise<Record<string, unknown>> {
        const res = await this.middleware({ method: 'GET', url: `${this.config?.apiBaseUrl}${url}` });
        return res;
    }

    public async post(url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
        const res = await this.middleware({ method: 'POST', url: `${this.config?.apiBaseUrl}${url}`, params: body });
        return res;
    }

    public async put(url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
        const res = await this.middleware({ method: 'PUT', url: `${this.config?.apiBaseUrl}${url}`, params: body });
        return res;
    }

    public async patch(url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
        const res = await this.middleware({ method: 'PATCH', url: `${this.config?.apiBaseUrl}${url}`, params: body });
        return res;
    }

    public async delete(url: string): Promise<Record<string, unknown>> {
        const res = await this.middleware({ method: 'DELETE', url: `${this.config?.apiBaseUrl}${url}` });
        return res;
    }

    private get options(): Record<string, unknown> {
        return this.token ? ({
            timeout: TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'app-version': this.config?.appVersion,
            },
        }) : {
            timeout: TIMEOUT,
            'app-version': this.config?.appVersion,
        };
    }

    private async middleware({ url, method, params }: IMiddlewareParams): Promise<Record<string, unknown>> {
        return new Promise((resolve, reject) => {
            const handleRequest = async (): Promise<void> => {
                switch (method) {
                    case 'GET': {
                        const res = await axios.get(url, this.options);
                        resolve(res.data);
                        break;
                    }
                    case 'POST': {
                        const res = await axios.post(url, params, this.options);
                        resolve(res.data);
                        break;
                    }
                    case 'PUT': {
                        const res = await axios.put(url, params, this.options);
                        resolve(res.data);
                        break;
                    }
                    case 'PATCH': {
                        const res = await axios.patch(url, params, this.options);
                        resolve(res.data);
                        break;
                    }
                    case 'DELETE': {
                        const res = await axios.delete(url, this.options);
                        resolve(res.data);
                        break;
                    }
                    default:
                        reject();
                        break;
                }
            };

            const exec = async (): Promise<void> => {
                try {
                    await handleRequest();
                } catch (e: any) {
                    Logger.log('ERROR', e);
                    const statusCode = Object(Object(e).response).status;
                    if (statusCode !== 401) reject(e);
                    else {
                        const authRefreshToken = localStorage.getItem(this.config?.refreshTokenStorageKey || '');
                        const anonymousRefreshToken = localStorage.getItem(this.config?.refreshTokenStorageKey || '');
                        if (!authRefreshToken && !anonymousRefreshToken) reject(e);
                        else if (authRefreshToken) {
                            try {
                                const { accessToken, refreshToken } = await this.refreshToken({ currentRefreshToken: authRefreshToken });
                                localStorage.setItem(this.config?.accessTokenStorageKey || '', accessToken);
                                localStorage.setItem(this.config?.refreshTokenStorageKey || '', refreshToken);
                                this.setToken(accessToken);
                            } catch (err) {
                                localStorage.removeItem(this.config?.accessTokenStorageKey || '');
                                localStorage.removeItem(this.config?.refreshTokenStorageKey || '');
                                Logger.log('Can not refresh authenticated token.');
                                localStorage.clear();
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }

                            try {
                                await handleRequest();
                            } catch (err) {
                                Logger.log('ERROR', err);
                                reject(err);
                            }
                        } else if (anonymousRefreshToken) {
                            try {
                                const { accessToken, refreshToken } = await this.refreshToken({ currentRefreshToken: anonymousRefreshToken });
                                localStorage.setItem(this.config?.accessTokenStorageKey || '', accessToken);
                                localStorage.setItem(this.config?.refreshTokenStorageKey || '', refreshToken);
                                this.setToken(accessToken);
                            } catch (err) {
                                Logger.log('ERROR', err);
                                localStorage.removeItem(this.config?.accessTokenStorageKey || '');
                                localStorage.removeItem(this.config?.refreshTokenStorageKey || '');
                                Logger.log('Can not refresh authenticated token.');
                                localStorage.clear();
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }

                            try {
                                await handleRequest();
                            } catch (err) {
                                Logger.log('ERROR', err);
                                reject(err);
                            }
                        }
                    }
                }
            };
            exec();
        });
    }

    public async refreshToken({ currentRefreshToken }: IRefreshTokenParams): Promise<IRefreshTokenResponse> {
        try {
            const res = await axios.post(`${this.config?.apiBaseUrl}/auth/refresh-token`, {}, {
                timeout: TIMEOUT,
                headers: {
                    'Authorization': `Bearer ${currentRefreshToken}`
                },
            });
            const data = Object(res.data).data;
            return {
                accessToken: String(data.accessToken),
                refreshToken: String(data.refreshToken),
            };
        } catch (e) {
            Logger.log('ERROR', e);
            throw new Error('refreshTokenFailed');
        }
    }

}

const http = new HttpService();
export default http;
