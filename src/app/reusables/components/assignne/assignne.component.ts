import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Options} from 'select2';
import {IssuesService} from '../../services/issues.service';
import {ActivatedRoute} from "@angular/router";
import {Memberships} from "../../interfaces/memberships";

@Component({
  selector: 'app-assignne',
  templateUrl: './assignne.component.html',
  styleUrls: ['./assignne.component.css']
})
export class AssignneComponent implements OnInit {
  memberships:any;
  id = this.route.snapshot.params.id;
  public options: Options;
  public valeur: number[];
  get value(): number[] {
    return this.valeur;
  }
  set value(value: number[]) {
    this.valeur = value;
    this.usersData.emit(this.value);
  }

  @Output('usersData') usersData = new EventEmitter<any>();
  constructor(private is: IssuesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.options = {
      width: '400',
      multiple: true,
      tags: true,
      containerCss: true
    };
  }

  sendData() {
    this.usersData.emit(this.memberships);
  }

  getAllUsers(): void {
    this.is.getAllUsers(this.id).subscribe((res) => {
      this.memberships = res.memberships.map((el: any) => {
        const o = Object.assign({text: el.user.name}, el);
        return o;
      });
    });
  }

}
