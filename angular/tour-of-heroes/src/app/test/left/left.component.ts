import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
})
export class LeftComponent implements OnInit {
  @Output() addEmitter = new EventEmitter();

  @Output() removeEmmiter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  add(evt: Event) {
    evt.stopPropagation();
    this.addEmitter.emit({ name: 'jojo' });
  }

  remove(evt: Event) {
    evt.stopPropagation();
    this.removeEmmiter.emit({ name: 'jojo' });
  }
}
