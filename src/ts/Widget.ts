import { interval } from "rxjs";
import { ajax } from "rxjs/ajax";
import { switchMap } from "rxjs/operators";
const dayjs = require("dayjs");

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
  messagesList: HTMLElement | null;

  constructor(container: HTMLElement | null, url: string) {
    if (!container) {
      throw new Error("Container element must not be null");
    }

    this.container = container;
    this.url = url;
    this.messagesList = null;
  }

  init() {
    this.container.innerHTML = `
      <h3>Incoming</h3>
      <div class="messages"></div>
    `;
    this.messagesList = this.container.querySelector(".messages");
    this.updateList();
  }

  updateList() {
    Widget.getDataWithInterval(this.url, 5000).subscribe({
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
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerHTML = `
      <span class="author">${data.from}</span>
      <span class="subject">${Widget.truncateSubject(data.subject, 15)}</span>
      <span class="timestamp">${Widget.formatTime(time)}</span>
    `;

    this.messagesList?.prepend(message);
  }

  static getDataWithInterval(url: string, intervalTime: number) {
    return interval(intervalTime).pipe(
      switchMap(() =>
        ajax.getJSON<{ timestamp: number; messages: MessageData[] }>(url)
      )
    );
  }

  static formatTime(timestamp: number) {
    return dayjs(timestamp).format("HH:mm DD.MM.YYYY");
  }

  static truncateSubject(subject: string, maxLength: number): string {
    return subject.length > maxLength
      ? `${subject.slice(0, maxLength - 1)}…`
      : subject;
  }
}
