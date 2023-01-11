import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
})
export class RightComponent implements OnInit {
  @Input() listOfData: any = [];

  @Input() addItem: any = {};
  @Input() removeItem: any = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    // console.log(this.addItem, this.removeItem);
    // console.log(this.listOfData);
    // if (Object.keys(this.addItem).length > 0) {
    //   this.listOfData = this.listOfData.map((item: any) => {
    //     item.headers = [...item.headers, this.addItem];
    //     return item;
    //   });
    // }
    // if (Object.keys(this.removeItem).length > 0) {
    //   this.listOfData = this.listOfData.map((item: any) => {
    //     item.headers = item.headers.filter((head: any) => head.name === 'haha');
    //     return item;
    //   });
    // }
  }
}
