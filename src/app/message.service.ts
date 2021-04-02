import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // array of messages that have type string
  messages: string[] = [];

  // adding messages into the array
  add(message: string) {
    this.messages.push(message);
  }

  // clear messages array
  clear(){
    this.messages = [];
  }

  constructor() { }
}
