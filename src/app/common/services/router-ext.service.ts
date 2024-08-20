import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterExtService {
    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            };
        });
    }

    public getPreviousUrl(): string {
        return this.previousUrl;
    }

    public getCurrentUrl(): string {
        return this.currentUrl;
    }
}