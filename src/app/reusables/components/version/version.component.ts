import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IssuesService} from "../../services/issues.service";
import {Issue} from "../../interfaces/Issue";
import {Category} from "../../interfaces/Category";
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Version} from "../../interfaces/Version";
import {TimeEntries} from "../../interfaces/Time-entries";
import {Memberships} from "../../interfaces/memberships";



@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VersionComponent implements OnInit {
  @Input() versions: Version[] = [];
  filteredVersion: Version[] = [];
  issues: Issue[] = [];
  timeEntries: TimeEntries[] = [];
  memberships:Memberships[]=[];
  filteredIssues: Issue[] = [];
  @Input() issue_categories: Category[] = [];
  filteredCategory: Category[] = [];
  @Input() infoFilter: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private is: IssuesService,
  ) {
    this.filter();
  }

  ngOnInit(): void {

  }

  filter() {
    this.getIssue();
    this.filteredIssues = this.issues;
    if (this.infoFilter?.selected_status) {
      const selectedStatusId = this.infoFilter.selected_status.map((value: { id: number; }) => value.id);
      this.filteredIssues = this.filteredIssues.filter(issue => selectedStatusId.includes(issue.status?.id));
    }
    if (this.infoFilter?.selected_trackers) {
      const selectedTrackersId = this.infoFilter.selected_trackers.map((value: { id: number; }) => value.id);
      this.filteredIssues = this.filteredIssues.filter(issue => selectedTrackersId.includes(issue.tracker?.id));
    }
    if (this.infoFilter?.searchUsersName?.length > 0) {
      const searchUsersNameId = this.infoFilter.searchUsersName.map((value: { id: number; }) => +value);
      this.memberships=this.memberships.filter(value => searchUsersNameId.includes(value.id))
      const userId=this.memberships.map(value => value.user.id)
      this.filteredIssues = this.filteredIssues.filter(issue => userId.includes(issue.assigned_to?.id));
    }
    if (this.infoFilter?.target_version?.length > 0) {
      const targetVersionId = this.infoFilter.target_version.map((value: { id: number; }) => +value);
      this.filteredVersion = this.versions.filter(version => targetVersionId.includes(version.id));
      this.filteredIssues = this.filteredIssues.filter(issue => targetVersionId.includes(issue.fixed_version?.id));
    }
    if (this.infoFilter?.category_name?.length > 0) {
      const categoryNameId = this.infoFilter.category_name.map((value: { id: number; }) => +value);
      this.filteredCategory = this.issue_categories.filter(category => categoryNameId.includes(category.id));
      this.filteredIssues = this.filteredIssues.filter(issue => categoryNameId.includes(issue.category?.id));

    }
    if (this.infoFilter?.Priorities?.length >0) {
      const searchPriorities = this.infoFilter.Priorities;
      this.filteredIssues = this.filteredIssues.filter(issue => searchPriorities.includes(issue.priority.id));

    }
  }

  ngOnChanges(): void {
    this.filteredCategory = [...this.issue_categories];
    this.filteredVersion = [...this.versions];
    this.filter();
    this.getTimeEntries();
    this.getUsersMembers();
  }

  getTimeEntries(): void {
    let id = this.route.snapshot.params.id;
    this.is.getTimeEntries(id).subscribe((res) => {
      this.timeEntries = res.time_entries;
    })

  }
getUsersMembers(){
  let id = this.route.snapshot.params.id;
  this.is.getAllUsers(id).subscribe(value => {
    this.memberships= value.memberships;


  })
}
  getIssue(): void {
    let id = this.route.snapshot.params.id;
    this.is.getIssueByIdProject(id).subscribe((res) => {
      this.issues = res.issues;
    });

  }

  getEstimatedTime(idCategory: number) {
    const estimatedTime = this.filteredIssues.filter(value =>
      value.category?.id === idCategory);
    let someEstimetedHours = 0;
    estimatedTime.forEach(issue => {
      if (issue.estimated_hours) {
        someEstimetedHours += issue.estimated_hours;
      }
    });
    return someEstimetedHours;
  }

  getDoneCategory(idCategory: number) {
    const doneCategory = this.filteredIssues.filter(value => value.category?.id === idCategory);
    let someDone = 0;
    let i = 0;
    doneCategory.forEach(issue => {
      if (issue.done_ratio) {
        someDone += issue.done_ratio;
      }
      i++;
    });
    let x = someDone / i;
    return x || 0;
  }

  getSpentTime(idCategory: number) {
    const spentTime = this.filteredIssues.filter(value => value.category?.id === idCategory);
    const res = this.timeEntries.filter((f) => spentTime.map(value => value.id).includes(f.issue.id));
    let someSpentTime = 0;
    res.forEach(issue => {
      if (issue.hours)
        someSpentTime += issue.hours;
    })
    return someSpentTime;
  }

  getEstimatedTimeVersion(idVersion: number) {
    const estimatedTimeVersion = this.filteredIssues.filter(value =>
      value.fixed_version?.id === idVersion);
    let someEstimetedHours = 0;
    estimatedTimeVersion.forEach(issue => {
      if (issue.estimated_hours) {
        someEstimetedHours += issue.estimated_hours;
      }
    });
    return someEstimetedHours;
  }

  getDoneVersion(idVersion: number) {
    const doneVersion = this.filteredIssues.filter(value =>
      value.fixed_version?.id === idVersion);
    let someDone = 0;
    let i = 0;
    doneVersion.forEach(issue => {

      if (issue.done_ratio) {
        someDone += issue.done_ratio;

      }
      i++;
    });
    let x = someDone / i;
    return x || 0;
  }

  getSpentTimeVersion(idVersion: number) {
    const spentTimeVersion = this.filteredIssues.filter(value => value.fixed_version?.id === idVersion);
    const res = this.timeEntries.filter((f) => spentTimeVersion.map(value => value.id).includes(f.issue.id));
    let someSpentTime = 0;
    res.forEach(issue => {
      if (issue.hours)
        someSpentTime += issue.hours;
    });
    return someSpentTime;
  }

  getEstimatedTimeVersionByCategory(idVersion: number, idCategory: number) {
    const estimatedTimeVersionByCategory = this.filteredIssues.filter(value =>
      value.fixed_version?.id === idVersion && value.category?.id === idCategory);
    let someEstimetedHours = 0;
    estimatedTimeVersionByCategory.forEach(issue => {
      if (issue.estimated_hours) {
        someEstimetedHours += issue.estimated_hours;
      }
    });
    return someEstimetedHours;
  }

  getDoneVersionByCategory(idVersion: number, idCategory: number) {
    const doneVersionByCategory = this.filteredIssues.filter(value =>
      value.fixed_version?.id === idVersion && value.category?.id === idCategory);
    let someDone = 0;
    let i = 0;
    doneVersionByCategory.forEach(issue => {
      if (issue.done_ratio) {
        someDone += issue.done_ratio;
      }
      i++;
    });
    let x = someDone / i;
    return x || 0;
  }

  getSpentTimeVersionByCategory(idVersion: number, idCategory: number) {
    const spentTimeVersionByCategory = this.filteredIssues.filter(value =>
      value.fixed_version?.id === idVersion && value.category?.id === idCategory);
    const res = this.timeEntries.filter((f) => spentTimeVersionByCategory.map(value => value.id).includes(f.issue.id));
    let someSpentTime = 0;
    res.forEach(issue => {
      if (issue.hours)
        someSpentTime += issue.hours;
    });
    return someSpentTime;
  }

  getIssueByIdVersion(idVersion: number, idCategory: number) {
    const issueByIdVersion = this.filteredIssues.filter(value =>
      value.fixed_version?.id === idVersion && value.category?.id === idCategory);
    return issueByIdVersion;
  }

  drop(event: CdkDragDrop<Issue[]>, category: Category, version: Version) {
    let issue = this.filteredIssues.filter(value => value.id === event.previousContainer.data[event.previousIndex].id)
    issue[0].category = category;
    issue[0].fixed_version = version;
    let issueObj = {
      "issue": {
        "category_id": category.id.toString(),
        "fixed_version_id": version.id.toString()
      }
    }
    this.is.updateIssue(issueObj, issue[0].id).subscribe();

  };


}
