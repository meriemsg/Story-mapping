
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IssuesService} from '../../services/issues.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-targetversion',
  templateUrl: './targetversion.component.html',
  styleUrls: ['./targetversion.component.css']
})
export class TargetversionComponent implements OnInit {

  target_version: any = '';
  @Input() version_id: any;
  options: any;
  version: any;
  id = this.route.snapshot.params.id;
  public valeur: string[];
  get value(): string[] {
    return this.valeur;
  }

  set value(value: string[]) {
    this.valeur = value;
    this.target_version_data.emit(this.value);
  }


  @Output('target_version_data') target_version_data = new EventEmitter<any>();


  constructor(private is: IssuesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllversions();
    this.options = {
      width: '300',
      multiple: true,
      tags: true
    };
  }

  getAllversions(): void {
    this.is.getIssueVersion(this.id).subscribe((res) => {
      this.version = res.versions.map((el: any) => {
        const o = Object.assign({text: el.name}, el);
        return o;
      });


    })
  }

}
