import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APIURL } from '../api-url.constants';
import { MessageService, BUS_EVENTS } from '../events/message.service';
import { Observable } from 'rxjs';
import { Message } from '../events/message';
import { map, tap } from 'rxjs/operators';
import { RsbLookupModel } from '../model/rsb-lookup.model';
import { Router } from '@angular/router';
import { ISpinnerValue } from 'src/app/shared/components/spinner/spinner.component';

export interface IServiceMethodParams {
  method: string;
  message?: string;
  suceessMessage?: string;
  errorMessage?: string;
}

export interface IServiceMethodMap {
  [methodAlias: string]: IServiceMethodParams;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private lookupModel: RsbLookupModel,
    private router: Router
  ) { }

  callGetAPI(url: string): Observable<any> {
    this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, true));
    return this.http.get(url).pipe(map((resp) => {
      this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, false));
      //return resp;
    }, (err) => {
      this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, false));
    }));
  }

  callPostAPI(operation: IServiceMethodParams, args: any): Observable<any> {
    const httpHeaders = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.lookupModel.getToken()}`
      });
    const url = APIURL.SERVER_URL + operation.method;
    const openSpinnerValue: ISpinnerValue = {
      loadFlag: true,
      loadMethod: operation.method,
      loadText: operation.message ? operation.message : ''
    };
    const closeSpinnerValue: ISpinnerValue = {
      loadFlag: false,
      loadMethod: operation.method,
      loadText: operation.message ? operation.message : ''
    };
    this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, openSpinnerValue));
    return this.http.post(url, args, { headers: httpHeaders }).pipe(tap((resp) => {
      this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, closeSpinnerValue));
    }, (err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.lookupModel.clearLoggedUser();
        this.messageService.sendMessage(new Message(BUS_EVENTS.LOGOUT, closeSpinnerValue));
        this.router.navigate(['']);
      }
      this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, closeSpinnerValue));
    }));
  }

  uploadImageAPI(operation: IServiceMethodParams, args: any): Observable<any> {
    const url = APIURL.SERVER_URL + operation.method;
    const openSpinnerValue: ISpinnerValue = {
      loadFlag: true,
      loadMethod: operation.method,
      loadText: operation.message ? operation.message : ''
    };
    const closeSpinnerValue: ISpinnerValue = {
      loadFlag: false,
      loadMethod: operation.method,
      loadText: operation.message ? operation.message : ''
    };
    this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, openSpinnerValue));
    return this.http.post(url, args).pipe(tap((resp) => {
      this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, closeSpinnerValue));
    }, (err) => {
      console.log(err);
      this.messageService.sendMessage(new Message(BUS_EVENTS.SPINNER_LOAD, closeSpinnerValue));
    }));
  }
}
