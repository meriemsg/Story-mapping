import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {basebackendUrl, key} from '../Const/configData';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


  private getProjectUrl = basebackendUrl + 'projects.json';
  private getProjectByIdUrl = basebackendUrl + 'projects/';

  constructor(private httpClient: HttpClient) {
  }

  getProject(): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getProjectUrl, {params});
  }

  getProjectById(id: number): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getProjectByIdUrl + id + '.json', {params});


  }
}

