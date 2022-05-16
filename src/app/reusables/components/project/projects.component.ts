import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Project} from '../../interfaces/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', './../../../../assets/CustomCss/DragAndDrop.css']
})
export class ProjectsComponent implements OnInit {
  map = new Map();
  @Input() projectNameData: any;
  projectList: Project[] = [];

  @Input() set projects(projects: Project[]) {
    this.projectList = projects;
    this.setProjectMap();
  } ;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if (this.projectNameData) {
      this.map.clear();
      this.setProjectMap();
      for (let [key, value] of this.map) {
        let existInSubProject = false;
        for (let x of value) {
          if (x) {
            if (x.id == this.projectNameData) {
              existInSubProject = true;
            }
          }
        }
        if (key != this.projectNameData && !existInSubProject) {
          this.map.delete(key);
        }
      }
    }
    this.ref.detectChanges();
  }

  setProjectMap() {
    const parentsID = this.projectList.filter(value =>
      value.parent === undefined || value.parent === null
    ).map(value => value.id);

    const subProject = this.projectList.filter(value =>
      value.parent !== undefined && value.parent !== null
    );
    parentsID.forEach(value => {
      this.map.set(value, []);
    });
    subProject.forEach(value => {
      let res = this.map.get(value.parent?.id);
      res.push(value);
    });

  }

  getProjectFromId(id: number) {
    return this.projectList.find(value => value.id === id);
  }

}
