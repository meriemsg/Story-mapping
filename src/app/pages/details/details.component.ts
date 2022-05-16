
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectsService} from "../../reusables/services/projects.service";
import {IssuesService} from "../../reusables/services/issues.service";
import {Category} from "../../reusables/interfaces/Category";
import {Version} from "../../reusables/interfaces/Version";
import {Status} from "../../reusables/interfaces/Status";
import {Tracker} from "../../reusables/interfaces/Tracker";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  user = 'Meriem Sagaama';
  searchProjectName: any;
  searchCategoriesName: any;
  searchUsersName: any;
  searchOrderBy = '';
  searchTargetVersion: any;
  selectedPriorities: any;
  infoFilter: any;
  project: any;
  issues: any[];
  selectedStatus: Status[] = [];
  selectedTrackers: Tracker[] = [];
  issue_categories: Category[] = [];
  versions: Version[] = [];
  id = this.route.snapshot.params.id;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private ps: ProjectsService,
              private is: IssuesService,
  ) {
  }


  ngOnInit(): void {
    this.getAllIssues();
    this.getIssueCategory();
    this.getTargetVersion();
    this.getProjectFromId(this.id);
  }

  getProjectFromId(id: number) {
    this.ps.getProjectById(id).subscribe((res) => {
      this.project = res.project;
    });
  }

  getAllIssues() {
    this.is.getIssueByIdProject(this.id).subscribe((res) => {
      this.issues = res.issues;
    });
  }


  getIssueCategory(): void {
    let id = this.route.snapshot.params.id;
    this.is.getIssueCategory(id).subscribe((res) => {
      this.issue_categories = res.issue_categories;
    });
  }

  getTargetVersion(): void {
    let id = this.route.snapshot.params.id;
    this.is.getIssueVersion(id).subscribe((res) => {
      this.versions = res.versions;
    });
  }
  ReceiptData(event: any) {
    this.searchProjectName = event;

  }
  ReceiptPriorities(event: any) {
    this.selectedPriorities = event;
  }
  ReceiptUsers(event: any) {
    this.searchUsersName = event;

  }


  ReceiptCategories(event: any) {
    this.searchCategoriesName = event;

  }

  ReceiptVersion(event: any) {
    this.searchTargetVersion = event;
  }

  ReceiptOrder(event: any) {
    this.searchOrderBy = event;
  }

  ReceiptTrackers(event: any) {
    this.selectedTrackers = event;
  }

  ReceiptStatus(event: any) {
    this.selectedStatus = event;
  }

  apply() {
    this.infoFilter = {

      "searchUsersName": this.searchUsersName,
      "target_version": this.searchTargetVersion,
      "order_by": this.searchOrderBy,
      "category_name": this.searchCategoriesName,
      "selected_trackers": this.selectedTrackers,
      "selected_status": this.selectedStatus,
      "Priorities": this.selectedPriorities
    }
  }

}
