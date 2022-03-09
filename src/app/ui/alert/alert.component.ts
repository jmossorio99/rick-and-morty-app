import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertState', [
      state('in', style({
        transform: 'translateY(0) translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        }),
        animate(300)]),
    ])
  ]
})
export class AlertComponent implements OnInit {
  // @ts-ignore
  @Input() message: string;
  @Output() close = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onAccept() {
    this.close.emit('accept');
  }

  onCancel() {
    this.close.emit('cancel');
  }

}
