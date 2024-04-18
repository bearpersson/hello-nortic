// Models should be auto generated

namespace API {
    namespace CatFact {
        interface Response {
            fact: string,
            length: number
        }
    }

    namespace ElPris {
        type Response = {
            SEK_per_kWh: number;
            EUR_per_kWh: number;
            EXR: number;
            time_start: string;
            time_end: string;
        }[]
    }
}