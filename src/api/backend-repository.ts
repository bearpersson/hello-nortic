import { HttpClient } from "./http-client";

class BackendRepositoryImpl {
    constructor(private client = new HttpClient()) {}

    public getCatFact(): Promise<API.CatFact.Response> {
        return this.client.get('https://catfact.ninja/fact');
    }
}

export const BackendRepository = new BackendRepositoryImpl();
