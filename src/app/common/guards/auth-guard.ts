import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { RsbLookupModel } from "../model/rsb-lookup.model";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private rsbLookupModel:RsbLookupModel,
        // private vendorService: VendorService
    ) { }

    canActivate() {
        if (this.rsbLookupModel.getLoggedUser() && this.rsbLookupModel.getToken()) {
            return true;
        }
        // else if (this.vendorModel.loadUserFromStorage()) {
        //     return this.vendorService.getProfileInfo(this.vendorModel.getLoggedUserId()).toPromise().then((rsp) => {
        //         if (rsp.statusCode === 0) {
        //             this.vendorModel.setLoggedUser(rsp.contents[0]);
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     });
        // }
        else {
           window.location.href="https://pillarblocks.com"
            return false;
        }
    }
}