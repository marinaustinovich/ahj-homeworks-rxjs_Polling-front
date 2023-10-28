import { MessageData } from "./Widget";
export declare class DataService {
    private url;
    constructor(url: string);
    getDataWithInterval(intervalTime: number): import("rxjs").Observable<{
        timestamp: number;
        messages: MessageData[];
    }>;
}
