
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'select2';
import {IssuesService} from '../../services/issues.service';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {

  @Output('prioritiesData') prioritiesData = new EventEmitter<any>();
  priority = [];
  public options : Options;
  public valeur : string[];
  constructor(private is: IssuesService) {
  }
  get value(): string[] {
    return this.valeur;
  }

  set value(value: string[]) {
    this.valeur = value;
    this.prioritiesData.emit(this.value);
  }

  ngOnInit(): void {
    this.getAllPriorities();
    this.options = {
      width: '300',
      multiple: false,
      tags: true
    };
  }

  sendPriority() {
    this.prioritiesData.emit(this.value);
  }

  getAllPriorities(): void {
    this.is.getPriority().subscribe((res) => {
      this.priority = [] = res.issue_priorities.map((el: any) => {
        const o = Object.assign({text: el.name}, el);
        return o;
      });
    });
  }
}
