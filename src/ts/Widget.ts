import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap } from 'rxjs/operators';
const dayjs = require('dayjs');

interface MessageData {
  id: string;
  from: string;
  subject: string;
  body: string;
  received: number;
}

export default class Widget {
  container: HTMLElement;
  url : string;

  constructor(container : HTMLElement | null, url : string) {
    if (!container) {
      throw new Error('Container element must not be null');
    }

    this.container = container;
    this.url = url;
    this.drawUi();
  }

  drawUi() {
    this.container.innerHTML = `
      <h3>Incoming</h3>
      <div class="messages"></div>
    `;
    this.updateList();
  }

  updateList() {
    Widget.getDataWithInterval(this.url, 5000).subscribe(
      (data : any) => {
        console.log('Data received:', data);
        const timestamp = data.timestamp;
        data.messages.forEach((el: MessageData) => {
          this.addMessage(el, timestamp);
        });
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  addMessage(data: MessageData, time : number) {
    const messagesList = this.container.querySelector('.messages');
    const message = document.createElement('div');
    message.classList.add('message');
    message.innerHTML = `
      <span class="author">${data.from}</span>
      <span class="subject">${Widget.truncateSubject(data.subject, 15)}</span>
      <span class="timestamp">${Widget.formatTime(time)}</span>
    `;
    if (messagesList) {
      messagesList.insertBefore(message, messagesList.firstChild);
    }
  }

  static getDataWithInterval(url : string, intervalTime : number) {
    return interval(intervalTime).pipe(
      switchMap(() => ajax.getJSON(url))
    );
  }

  static formatTime(timestamp: number) {
    return dayjs(timestamp).format('HH:mm DD.MM.YYYY');
  }

  static truncateSubject(subject: string, maxLength: number): string {
    return subject.length > maxLength ? subject.slice(0, maxLength - 1) + '…' : subject;
  }
}