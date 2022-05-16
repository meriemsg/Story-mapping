import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  order = 'updated_date';
  @Output('order_by') order_by = new EventEmitter<String>();
  constructor() {
  }
  ngOnInit(): void {
  }

  sendOrder(event: any) {
    this.order_by.emit(this.order);
  }

}
