import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService, BUS_EVENTS } from 'src/app/common/events/message.service';

export interface ISpinnerValue {
  loadFlag: boolean;
  loadText: string;
  loadMethod: string;
}


@Component({
  selector: 'rsb-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  loadText: string;
  spinnerChangeHandler: Subscription;
  loadingList: Array<ISpinnerValue> = [];
  loadingTimeout;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.spinnerChangeHandler = this.messageService.onMessage(BUS_EVENTS.SPINNER_LOAD, (value) => {
      this.updateLoadingQueue(value);
    });
  }

  updateLoadingQueue(value: ISpinnerValue): void {
    if(value.loadFlag) {
      this.loadingList.push(value);
    } else {
      const idx = this.loadingList.findIndex(item => item.loadMethod === value.loadMethod);
      if(idx !== -1) {
        this.loadingList.splice(idx, 1);
      }
    }

    if(this.loadingList.length > 0) {
      if(this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }
      this.loading = true;
      this.loadText = this.loadingList[0].loadText;
    } else {
      this.loadingTimeout = setTimeout(() => {
        this.loading =  false;
      }, 500);
    }
  }

  ngOnDestroy() {
    this.spinnerChangeHandler.unsubscribe();
  }
}
