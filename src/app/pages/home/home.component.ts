import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../reusables/services/projects.service';
import {Project} from '../../reusables/interfaces/Project';
import {ActivatedRoute, Router} from '@angular/router';
import {IssuesService} from 'src/app/reusables/services/issues.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projectNameData: any;
  projects: Project[] = [];
  priorities: any;
  user: any;
  searchPriority: any;
  constructor(private ps: ProjectsService,
              private router: Router,
              private route: ActivatedRoute,
              private is: IssuesService,
  ) {
  }

  ngOnInit(): void {
    this.getProject();
    this.getPriority();
  }
  getProject(): void {
    this.ps.getProject().subscribe(res => {
        this.projects = res.projects;
      });
  }
  getPriority(): void {
    this.is.getPriority().subscribe((res) => {
      this.priorities = res.priorities;
    });
  }

}
