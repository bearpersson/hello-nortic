// Models should be auto generated

namespace API {
    namespace CatFact {
        interface Response {
            fact: string,
            length: number
        }
    }

    namespace DogFact {

        interface FactData {
            id: string;
            type: string;
            attributes: {
                body: string;
            };
        }
        
        interface Response {
            data: FactData[];
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