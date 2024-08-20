import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { Message } from './message';
import { filter, map } from 'rxjs/operators';

export enum BUS_EVENTS {
    LOGOUT = 'LOGOUT',
    LOGIN = 'LOGIN',
    SPINNER_LOAD = 'SPINNER_LOAD',
    COUNTRY_CHANGE = 'COUNTRY_CHANGE',
    MODULE_CHANGE = 'MODULE_CHANGE',
    LOCATION_CHANGE = 'LOCATION_CHANGE'
}

@Injectable({
    providedIn: 'root'
}) 
export class MessageService {
    subject = new Subject<Message>();

    sendMessage(msg: string | Message) {
        if (typeof msg === 'string') {
            this.subject.next(new Message(msg));
        }
        else if(typeof msg === 'object') {
            this.subject.next(msg);
        }
    }

    onMessage(msgname: string, action: any, transform?: any): Subscription {
        return this.subject.asObservable().pipe(
            filter((m: Message) => m.name === msgname),
            map((msg: Message) => {
                if(msg.data && transform) {
                    return transform(msg.data);
                }
                else {
                    return msg.data;
                }
            })
        )
        .subscribe(action);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    clearMessages() {
        this.subject.next();
    }
}