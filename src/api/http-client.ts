
export interface IHttpClientOptions {
    method?: 'DELETE' | 'GET' | 'POST' | 'PUT';
    params?: Record<string, string>;
    headers?: Record<string, string>;
    responseType?: 'json' | 'text';
}

interface IHttpResponse<T> {
    body: T;
    headers: Headers;
}

export type HttpMethod = 'DELETE' | 'GET' | 'POST' | 'PUT';

export interface IHttpClient {
    delete<T = void>(url: string, body?: unknown, options?: IHttpClientOptions): Promise<T>;
    get<T>(url: string, options?: IHttpClientOptions): Promise<T>;
    post<T>(url: string, body: unknown, options?: IHttpClientOptions): Promise<T>;
    put<T>(url: string, body: unknown, options?: IHttpClientOptions): Promise<T>;
    raw<T>(url: string, body?: unknown, options?: IHttpClientOptions): Promise<IHttpResponse<T>>;
}

export class HttpClient implements IHttpClient {
    constructor(private fetcher = fetch) {}

    public delete<T>(url: string, body?: unknown, options?: IHttpClientOptions): Promise<T> {
        return this.raw<T>(url, JSON.stringify(body), {
            method: 'DELETE',
            ...options
        }).then((r) => r.body);
    }

    public get<T>(url: string, options?: IHttpClientOptions): Promise<T> {
        return this.raw<T>(url, undefined, { method: 'GET', ...options }).then((r) => r.body);
    }

    public post<T>(url: string, body: unknown, options?: IHttpClientOptions): Promise<T> {
        return this.raw<T>(url, JSON.stringify(body), { method: 'POST', ...options }).then((r) => r.body);
    }

    public put<T>(url: string, body: unknown, options?: IHttpClientOptions): Promise<T> {
        return this.raw<T>(url, JSON.stringify(body), { method: 'PUT', ...options }).then((r) => r.body);
    }

    public raw<T>(url: string, body?: BodyInit | null, options?: IHttpClientOptions): Promise<IHttpResponse<T>> {
        const method = options?.method ?? 'GET';
        return this.invoke(url, { method, body }, options);
    }

    public static createRequestUrl(url: string, query?: IHttpClientOptions['params']): string {
        const params = query ?? {};
        const containsParams: boolean = Object.keys(params).length > 0;
        return containsParams ? [url, new URLSearchParams(params).toString()].join('?') : url;
    }

    private invoke<T>(
        url: string,
        requestInit: RequestInit,
        options?: IHttpClientOptions
    ): Promise<IHttpResponse<T>> {
        const requestUrl = HttpClient.createRequestUrl(url, options?.params);

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...(options?.headers ?? {})
        };
        const request: RequestInit = { ...requestInit, headers, redirect: 'error' };

        return this.fetcher(requestUrl, request).then((response) => {
            const parser = HttpClient.getParser(options?.responseType);

            return parser(response).then((body) => {
                const isSuccessful: boolean = response.status >= 200 && response.status < 300;
                if (isSuccessful) {
                    return Promise.resolve({ body, headers: response.headers });
                } else {
                    return Promise.reject({ status: response.status, body: response.body });
                }
            });
        });
    }

    private static getParser(responseType?: IHttpClientOptions['responseType']) {
        const responseTypes = {
            json: (response: Response) => response.json(),
            text: (response: Response) => response.text(),
        };
        return responseTypes[responseType ?? 'json'];
    }
}
