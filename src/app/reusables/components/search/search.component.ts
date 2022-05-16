import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_project: any = '';
  projectData: any = [];
  @Output('projectNameData') projectNameData = new EventEmitter<any>();
  @Input('data_placer') data_placer: string;
  @Input('disabled_search') disabled_search: boolean;
  public options: any;
  public valeur: string[];

  get value(): string[] {
    return this.valeur;
  }
  set value(value: string[]) {
    this.valeur = value;
    this.projectNameData.emit(this.value);
  }
  constructor(private projectService: ProjectsService) {
  }
  ngOnInit(): void {
    this.options = {
      width: '320',
      multiple: false,
      tags: true
    };
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getProject().subscribe((res: any) => {
      this.projectData = res['projects'].map((el: any) => {
        const o = Object.assign({text: el.name}, el);
        return o;
      });
    });
  }
  sendData() {
    this.projectNameData.emit(this.search_project);

  }
}

