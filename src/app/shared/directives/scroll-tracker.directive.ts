import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[scrollTracker]',
})
export class ScrollTracker {
    @Output() scrolled = new EventEmitter<any>();

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {

        //alert("getting");
        // do tracking
        console.log('scrolled', event.target.scrollTop);
        // Listen to click events in the component
        // alert(event.target.scrolled)
        let tracker = document.documentElement;
        let endReached = false;
        let limit = tracker.scrollHeight - tracker.clientHeight;

        // console.log(tracker.scrollTop, limit);
        if (parseInt(tracker.scrollTop.toString()) === parseInt(limit.toString())) {
            endReached = true;
            console.log('REACHED END');
        }

        this.scrolled.emit({
            pos: tracker.scrollTop,
            endReached
        })
    }
}