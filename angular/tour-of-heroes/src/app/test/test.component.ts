import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  list: any = [{ headers: [{ name: 'haha' }] }];

  addItem = {};
  removeItem = {};
  constructor() {}

  ngOnInit(): void {}

  add(evt: Event) {
    this.addItem = evt;
    this.removeItem = {};

    this.list = this.list.map((item: any) => {
      item.headers = [...item.headers, this.addItem];
      return item;
    });
  }

  remove(evt: Event) {
    this.removeItem = evt;
    this.addItem = {};

    this.list = this.list.map((item: any) => {
      item.headers = item.headers.filter((head: any) => head.name === 'haha');
      return item;
    });
  }
}
