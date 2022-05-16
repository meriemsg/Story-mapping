import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {basebackendUrl, key} from '../Const/configData';


@Injectable({
  providedIn: 'root'
})
export class GeneraldataService {

  getAllStatusUrlDocker = basebackendUrl + 'issue_statuses.json';
  getAllTrackersUrlDocker = basebackendUrl + 'trackers.json';


  constructor(private httpClient: HttpClient) {
  }

  getStatus(): Observable<any> {

    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getAllStatusUrlDocker,{params});

  }

  getx1(): Observable<any> {
    return this.httpClient.get<any>(`../Const/StatusColor.json`);
  }

  getx() {
    return [

      {'color': 'gray', 'code': '#8f8d8d'},
      {'color': 'purple', 'code': '#cb12cb'},
      {'color': 'salmon', 'code': '#f5c2a2'},
      {'color': 'yellow', 'code': '#dbdb42'},
      {'color': 'orange', 'code': '#f18b25'},
      {'color': 'chartreuse', 'code': '#87e52a'},
      {'color': 'teal', 'code': '#24d485'},
      {'color': 'red', 'code': '#e90a10'}
    ];
  }

  getTrackers(): Observable<any> {
    let params = new HttpParams();
    if (typeof key === "string") {
      params = params.append('key', key);
    }
    return this.httpClient.get<any>(this.getAllTrackersUrlDocker,{params});
  }


}
