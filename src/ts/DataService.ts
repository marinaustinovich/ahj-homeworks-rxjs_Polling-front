import { interval } from "rxjs";
import { ajax } from "rxjs/ajax";
import { switchMap } from "rxjs/operators";
import { MessageData } from "./Widget";

export class DataService {
  constructor(private url: string) {}
  getDataWithInterval(intervalTime: number) {
    return interval(intervalTime).pipe(
      switchMap(() =>
        ajax.getJSON<{ timestamp: number; messages: MessageData[] }>(this.url)
      )
    );
  }
}
