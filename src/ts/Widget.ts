import { Subscription } from "rxjs";
import { DOMService } from "./DOMService";
import { DataService } from "./DataService";

export interface MessageData {
  id: string;
  from: string;
  subject: string;
  body: string;
  received: number;
}

const UPDATE_INTERVAL = 5000;

export default class Widget {
  private domService: DOMService;
  private dataService: DataService;
  private container: HTMLElement;
  private url: string;
  private messagesList: HTMLElement | null;
  private subscription: Subscription | null = null;

  constructor(container: HTMLElement | null, url: string) {
    if (!container) {
      throw new Error("Container element must not be null");
    }

    this.subscription = null;
    this.container = container;
    this.url = url;
    this.messagesList = null;
    this.domService = new DOMService();
    this.dataService = new DataService(this.url);
  }

  init(): void {
    this.createUI();
    this.updateList();
  }

  createUI(): void {
    const header = this.domService.createHeader("Incoming");
    const messagesDiv = this.domService.createMessagesContainer();

    this.container.appendChild(header);
    this.container.appendChild(messagesDiv);
    this.messagesList = messagesDiv;
  }

  updateList(): void {
    this.subscription = this.dataService
      .getDataWithInterval(UPDATE_INTERVAL)
      .subscribe({
        next: ({
          timestamp,
          messages,
        }: {
          timestamp: number;
          messages: MessageData[];
        }) => {
          messages.forEach((message) => this.addMessage(message, timestamp));
        },
        error: (error) => console.error("Error:", error),
      });
  }

  addMessage(data: MessageData, time: number) {
    const message = this.domService.createMessage(data, time);
    if (this.messagesList) {
      this.domService.prependToContainer(this.messagesList, message);
    }
  }

  destroy(): void {
    this.subscription?.unsubscribe();
  }
}
