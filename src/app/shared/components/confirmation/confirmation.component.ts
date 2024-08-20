import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input() modalDetails: {title: string, message: string};

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(rsn?: any): void {
    this.activeModel.close(rsn);
  }

  confirm(): void {
    this.close(true)
  }

  cancel(): void {
    this.close();
  }

}
