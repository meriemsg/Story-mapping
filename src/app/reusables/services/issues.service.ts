import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {basebackendUrl, key} from "../Const/configData";



@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private getAllUsersUrl = basebackendUrl+'/projects/';
  private getAllPriorityUrl = basebackendUrl+ 'enumerations/issue_priorities.json';
  private getIssueCategoriesAndVersionsUrl = basebackendUrl + 'projects/';
  private getIssueByIdProjectUrl = basebackendUrl + 'issues.json?project_id=';
  private updateIssueUrl = basebackendUrl + 'issues/';
  private getTimeEntriesUrl = basebackendUrl + 'time_entries.json?project_id=';

  constructor(private httpClient: HttpClient) {
  }

  getIssueByIdProject(id: number): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getIssueByIdProjectUrl + id, {params})
  }

  getIssueCategory(id: number): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getIssueCategoriesAndVersionsUrl + id + '/issue_categories.json', {params})
  }

  getIssueVersion(id: number): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getIssueCategoriesAndVersionsUrl + id + '/versions.json', {params})
  }

  getPriority(): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getAllPriorityUrl ,{params})
  }

  getAllUsers(id:number): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getAllUsersUrl +id+ '/memberships.json', {params})
  }

  updateIssue(issue: any, id: number) {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.put<any>(this.updateIssueUrl + id + '.json', issue, {params})
  }

  getTimeEntries(id: number): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getTimeEntriesUrl + id, {params})
  }

}
