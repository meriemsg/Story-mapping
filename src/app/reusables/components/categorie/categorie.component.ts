import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';
import {IssuesService} from '../../services/issues.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories = []
  id = this.route.snapshot.params.id;
  public options: Options;
  public valeur: string[];
  get value(): string[] {
    return this.valeur;
  }
  set value(value: string[]) {
    this.valeur = value;
    this.categoriesData.emit(this.value);
  }
  @Output('categoriesData') categoriesData = new EventEmitter<any>();
  constructor(private is: IssuesService, private route: ActivatedRoute,) {
  }
  ngOnInit() {
    this.getAllCategories();
    this.options = {
      width: '500',
      multiple: true,
      tags: true,
      containerCss: true
    };
  }


  sendData() {
    this.categoriesData.emit(this.value);
  }

  getAllCategories(): void {
    this.is.getIssueCategory(this.id).subscribe((res) => {
      this.categories = res.issue_categories.map((el: any) => {
        const o = Object.assign({text: el.name}, el);
        return o;
      });
    });
  }
}
