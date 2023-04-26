interface MessageData {
    id: string;
    from: string;
    subject: string;
    body: string;
    received: number;
}
export default class Widget {
    container: HTMLElement;
    url: string;
    constructor(container: HTMLElement | null, url: string);
    drawUi(): void;
    updateList(): void;
    addMessage(data: MessageData, time: number): void;
    static getDataWithInterval(url: string, intervalTime: number): import("rxjs").Observable<unknown>;
    static formatTime(timestamp: number): any;
    static truncateSubject(subject: string, maxLength: number): string;
}
export {};
