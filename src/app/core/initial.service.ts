import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DataService, IServiceMethodMap } from 'src/app/common/services/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RsbLookupModel } from 'src/app/common/model/rsb-lookup.model';
import { MessageService, BUS_EVENTS } from 'src/app/common/events/message.service';
import { Message } from 'src/app/common/events/message';
import * as storageUtil from 'src/app/common/utility/storage.utility';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';


export const SRV_OPS: IServiceMethodMap = {
  getCustomerInfo: {
    method: 'associate/getCustomerInfoOnIp',
    message: 'Loading Customer information...'
  },
  getDeviceId: {
    method: 'associate/getDeviceId'
  },

}

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor(
    private dataService: DataService,
    private lookupModel: RsbLookupModel,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.lookupModel.isBrowser = isPlatformBrowser(platformId);
  }

  loadApp(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.lookupModel.isBrowser) {
        let deviceId = storageUtil.readCookie('deviceId')
        if (deviceId && deviceId !== ' ') {
          this.lookupModel.setUuid(deviceId);
          this.loginWithDeviceId(deviceId).toPromise().then((rsp) => resolve(), (err) => resolve());
        } else {
          this.dataService.callPostAPI(SRV_OPS.getDeviceId, {}).subscribe((rsp) => {
            if (rsp.statusCode === 0) {
              const id = rsp.contents;
              storageUtil.createCookie('deviceId', id);
              this.lookupModel.setUuid(id);
              this.loginWithDeviceId(id).toPromise().then((rsp) => resolve(), (err) => resolve());
            }
          }, (err) => {
            resolve();
          });
        }
      } else {
        resolve();
      }
    });
  }

  loginWithDeviceId(deviceId: string): Observable<any> {
    const args = {
      // ip: deviceId
      ip: 'NLZBiJ'
    };
    return this.dataService.callPostAPI(SRV_OPS.getCustomerInfo, args).pipe(
      map((rsp) => {
        if (rsp.statusCode === 0) {
          const userDetails = rsp.contents[0];
          if (rsp.contents.length > 0) {
            this.lookupModel.setLoggedUser(userDetails);
            this.lookupModel.setCustomerId(userDetails.customerId);
            this.lookupModel.setToken(rsp.customerToken);
            this.lookupModel.loginSubscription.next(true);

          } else {
            console.log("getting in to else condition")
            this.lookupModel.clearLoggedUser();
            this.lookupModel.setCustomerId(null);
            this.lookupModel.setToken(null);

            console.log(this.lookupModel.getLoggedUser().customerId);
          }
        } else {
          this.messageService.sendMessage(new Message(BUS_EVENTS.LOGOUT, true));
        }
        return true;
      }, (err) => {
        console.log(err);
      })
    );
  }
}
