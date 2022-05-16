import {Component, Input, OnInit} from '@angular/core';
import {GeneraldataService} from '../../services/generaldata.service';
import {Issue} from "../../interfaces/Issue";
import {ActivatedRoute, Router} from "@angular/router";
import {IssuesService} from "../../services/issues.service";
import {TimeEntries} from "../../interfaces/Time-entries";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  @Input() filteredIssues: any[] = [];
  @Input() issues: Issue[] = [];
  arrayDataColors = [] as any;
  time_entries: TimeEntries[] = [];

  constructor(private dataService: GeneraldataService,
              private router: Router,
              private is: IssuesService,
              private route: ActivatedRoute) {
    this.getTimeEntries();
  }

  ngOnInit(): void {

    this.getAllColors();
  }

  getColor(id: any) {
    const color = this.arrayDataColors.filter((el: any, index: any) => index === id - 1);
    return color[0].code;
  }

  getAllColors() {

    this.arrayDataColors = this.dataService.getx();

  }

  getTimeEntries(): void {
    let id = this.route.snapshot.params.id;
    this.is.getTimeEntries(id).subscribe((res) => {
      this.time_entries = res.time_entries;
    })
  }

  getSpentTime(id: number) {
    const spentTime = this.time_entries.filter(value =>
      value.issue.id === id);

    let someSpentTime = 0;
    spentTime.forEach(issue => {
      if (issue.hours)
        someSpentTime = issue.hours;
    })
    return someSpentTime;
  }
}
