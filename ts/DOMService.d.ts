import { MessageData } from "./Widget";
export declare class DOMService {
    createHeader(text: string): HTMLElement;
    createMessagesContainer(): HTMLElement;
    createMessage(data: MessageData, time: number): HTMLElement;
    prependToContainer(container: HTMLElement, element: HTMLElement): void;
}
