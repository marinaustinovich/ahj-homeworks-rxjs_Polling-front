export interface MessageData {
    id: string;
    from: string;
    subject: string;
    body: string;
    received: number;
}
export default class Widget {
    private domService;
    private dataService;
    private container;
    private url;
    private messagesList;
    private subscription;
    constructor(container: HTMLElement | null, url: string);
    init(): void;
    createUI(): void;
    updateList(): void;
    addMessage(data: MessageData, time: number): void;
    destroy(): void;
}
