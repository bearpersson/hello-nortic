import { HttpClient } from "./http-client";

class BackendRepositoryImpl {
    constructor(private client = new HttpClient()) {}

    public getCatFact(): Promise<API.CatFact.Response> {
        return this.client.get('https://catfact.ninja/fact');
    }

    public getDogFact(): Promise<API.DogFact.Response> {
        return this.client.get('https://dogapi.dog/api/v2/facts');
    }

    public getElPris(year: number): Promise<API.ElPris.Response> {
        return this.client.get(`https://www.elprisetjustnu.se/api/v1/prices/${year}/04-18_SE4.json`);
    }
}

export const BackendRepository = new BackendRepositoryImpl();
