import { HttpClient } from "./http-client";

class BackendRepositoryImpl {
    constructor(private client = new HttpClient()) {}

    public getCatFact(): Promise<API.CatFact.Response> {
        return this.client.get('https://catfact.ninja/fact');
    }

    public getElPris(): Promise<API.ElPris.Response> {
        return this.client.get('https://www.elprisetjustnu.se/api/v1/prices/2024/04-18_SE4.json');
    }
}

export const BackendRepository = new BackendRepositoryImpl();
