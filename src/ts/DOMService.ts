import { MessageData } from "./Widget";
import { formatTime, truncateSubject } from "./utils";

const SUBJECT_TRUNCATE_LENGTH = 15;

export class DOMService {
    createHeader(text: string): HTMLElement {
        const header = document.createElement("h3");
        header.textContent = text;
        return header;
      }
    
      createMessagesContainer(): HTMLElement {
        const messagesDiv = document.createElement("div");
        messagesDiv.classList.add("messages");
        return messagesDiv;
      }
    
      createMessage(data: MessageData, time: number): HTMLElement {
        const message = document.createElement("div");
        message.classList.add("message");
    
        const authorSpan = document.createElement("span");
        authorSpan.classList.add("author");
        authorSpan.textContent = data.from;
    
        const subjectSpan = document.createElement("span");
        subjectSpan.classList.add("subject");
        subjectSpan.textContent = truncateSubject(data.subject, SUBJECT_TRUNCATE_LENGTH);
    
        const timestampSpan = document.createElement("span");
        timestampSpan.classList.add("timestamp");
        timestampSpan.textContent = formatTime(time);
    
        message.appendChild(authorSpan);
        message.appendChild(subjectSpan);
        message.appendChild(timestampSpan);
    
        return message;
      }
    
      prependToContainer(container: HTMLElement, element: HTMLElement): void {
        container.prepend(element);
      }
  }